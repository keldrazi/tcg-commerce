import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';

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
}


