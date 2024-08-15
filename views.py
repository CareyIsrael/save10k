from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Slot
from .serializers import SlotSerializer

@api_view(['POST'])
def save_slots(request):
    save_name = request.data.get('save_name')
    Slot.objects.filter(save_name=save_name).delete()  # Clear existing slots with the same save name

    serializer = SlotSerializer(data=request.data.get('slots'), many=True)
    if serializer.is_valid():
        for item in serializer.validated_data:
            item['save_name'] = save_name  # Add save name to each slot
        Slot.objects.bulk_create([Slot(**item) for item in serializer.validated_data])
        return Response({'status': 'Data saved successfully!'})
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def load_slots(request):
    save_name = request.query_params.get('save_name')
    slots = Slot.objects.filter(save_name=save_name)
    if slots.exists():
        serializer = SlotSerializer(slots, many=True)
        return Response({'slots': serializer.data})
    return Response({'slots': None})
