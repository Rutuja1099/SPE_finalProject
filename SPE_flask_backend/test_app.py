import pytest
from app import app  # Import your Flask app

@pytest.fixture
def client():
    """Sets up the Flask test client."""
    app.config['TESTING'] = True

    with app.test_client() as client:
        yield client  # This will be passed to the test functions

def test_hello(client):
    """Test the hello endpoint."""
    rv = client.get('/')
    assert rv.status_code == 200
    assert rv.get_json() == "hello"

# def test_video_upload(client):
#     """Test the video upload endpoint."""
#     sample_video_path = 'path/to/sample_video.mp4'  # Replace with an actual path
# 
#     with open(sample_video_path, 'rb') as video:
#         video_data = video.read()
# 
#     rv = client.post('/video', data=video_data, content_type='video/mp4')
#     assert rv.status_code == 200
#     assert rv.data.decode() == "Video read"

