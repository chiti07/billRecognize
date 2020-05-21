export interface TextRecognitionResponse {
    status: string;
    recognitionResult: RecognitionResult;
  }

  interface RecognitionResult {
    lines: number;
    boundingBox: BoundingBox;
    text: string;
    words: [BoundingBox, string];
    
  }
  
  interface BoundingBox {
    top: number;
    left: number;
    width: number;
    height: number;
}
  
 
  