export interface FaceRecognitionResponse {
    faceId: string;
    faceRectangle: FaceRectangle;
    faceAttributes: FaceAttributes;
  }

  interface FaceAttributes {
    smile: number;
    headPose: string;
    gender: string;
    age: number;
    
  }
  
  
  interface FaceRectangle {
    top: number;
    left: number;
    width: number;
    height: number;
  }
  