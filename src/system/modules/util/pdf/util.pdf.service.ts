import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import * as Canvas from 'canvas';

@Injectable()
export class UtilPDFService {

    constructor(
        
    ) {}

    async renderPDF(pdfData: any): Promise<Buffer> {
        const pdfBuffer: Buffer = await new Promise(resolve => {
            const doc = new PDFDocument({
                size: 'A4',
                bufferPages: true,
                autoFirstPage: false,
             })
          
            doc.fontSize(10)
            doc.addPage({margins:{top:10,left:20,right:10,bottom:10}})
            doc.text(pdfData)
            doc.end()
        
            const buffer = []
          
            doc.on('data', buffer.push.bind(buffer))
            doc.on('end', () => {
                const data = Buffer.concat(buffer)
                resolve(data)
            })
        })
    
        return pdfBuffer
    }

    async convertToImages(pdf) {
        let pdfData = pdf;
      
        pdfData = new Uint8Array(pdf);
        
    
        const outputPages: Buffer[] = [];
        const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
        
        const loadingTask = pdfjs.getDocument({ data: pdfData, disableFontFace: true, verbosity: 0 });
        const pdfDocument = await loadingTask.promise;
        const pageNumbers = Array.from({ length: pdfDocument.numPages }, (_, i) => i + 1);
      
        for (const pageNo of pageNumbers) {
          const image = await this.docRender(pdfDocument, pageNo);
          outputPages.push(image);
        }
        
        return outputPages;
        
      }
    
      async docRender(pdfDocument, pageNo) {
        const page = await pdfDocument.getPage(pageNo);
        const outputScale = 1.0;
        let viewport = page.getViewport({ scale: outputScale });
        
        
        
        let canvas: Canvas.Canvas | null = Canvas.createCanvas(viewport.width, viewport.height);
        let context: Canvas.CanvasRenderingContext2D | null = canvas.getContext("2d");
        const renderContext = {
          canvasContext: context,
          viewport,
        };
      
        await page.render(renderContext).promise;
        const image = canvas.toBuffer();
      
        //DESTROY CANVAS RESOURCES;
        canvas.width = 0;
        canvas.height = 0;
        canvas = null;
        context = null;
      
        return image;
      }
}


