# backend/api/views.py

from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sentinelhub import SentinelHubRequest, DataCollection, MimeType, CRS, BBox, bbox_to_dimensions
from sentinel_config import get_sentinel_config
import numpy as np
from PIL import Image
import io
import base64
from .ml_model import predict_heatmap

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_satellite_image(request):
    lat = request.data.get('lat')
    lng = request.data.get('lng')

    bbox = BBox([lng - 0.01, lat - 0.01, lng + 0.01, lat + 0.01], crs=CRS.WGS84)
    size = bbox_to_dimensions(bbox, resolution=10)  # 10m per pixel


    evalscript = """
        function setup() {
        return {
        input: ["B02", "B03", "B04"],
        output: {
        bands: 3,
        sampleType: "AUTO" // Will automatically rescale
        }
    };
    }

    function evaluatePixel(sample) {
    return [sample.B04, sample.B03, sample.B02];
    }
    """
    config = get_sentinel_config()

    request = SentinelHubRequest(
    evalscript=evalscript,
    input_data=[
    SentinelHubRequest.input_data(
        data_collection=DataCollection.SENTINEL2_L2A,
        time_interval=("2024-06-01", "2024-07-01"),
        mosaicking_order='leastCC'
    )
    ],

    responses=[SentinelHubRequest.output_response('default', MimeType.PNG)],
    bbox=bbox,
    size=size,
    config=config
)


    image = request.get_data()[0]  # numpy array
    pil_img = Image.fromarray(image)
    
    # Convert to base64 to return to frontend
    buffered = io.BytesIO()
    pil_img.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode()

    return Response({ 'image': img_base64 })

@api_view(['POST'])
def predict_image(request):
    # 🔁 Decode incoming base64 image
    image_base64 = request.data.get('image')
    if not image_base64:
        return Response({ "error": "Image not provided" }, status=400)

    image_data = base64.b64decode(image_base64.split(',')[1])
    image = Image.open(io.BytesIO(image_data)).convert("RGB")

    # 🔥 Run your model
    heatmap = predict_heatmap(image)

    # 🔁 Convert back to base64
    output = io.BytesIO()
    heatmap.save(output, format='PNG')
    encoded = base64.b64encode(output.getvalue()).decode()

    return Response({ "heatmap": encoded })