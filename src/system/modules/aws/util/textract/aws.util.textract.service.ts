import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
 
@Injectable()
export class AwsUtilTextractService {
  
    constructor(
        private readonly configService: ConfigService,
    ){}

    async processTextractData(response) {
        let data = this.getTableJSONResults(response);
      
        
        

        return data;
    }

    getRowsColumnsMap(table_result, blocks_map) {
        const rows = {};
      
        for (let relationship of table_result["Relationships"]) {
          if (relationship["Type"] === "CHILD") {
            for (let child_id of relationship["Ids"]) {
              const cell = blocks_map[child_id];
              if (cell["BlockType"] === "CELL") {
                const row_index = cell["RowIndex"];
                const col_index = cell["ColumnIndex"];
                if (!(row_index in rows)) {
                  rows[row_index] = {};
                }
                rows[row_index][col_index] = this.getText(cell, blocks_map);
              }
            }
          }
        }
      
        return rows;
    }
      
    getText(result, blocks_map) {
        let text = "";
        if (result["Relationships"]) {
          for (let relationship of result["Relationships"]) {
            if (relationship["Type"] === "CHILD") {
              for (let child_id of relationship["Ids"]) {
                const word = blocks_map[child_id];
                if (word["BlockType"] === "WORD") text += word["Text"] + " ";
                if (word["BlockType"] == "SELECTION_ELEMENT") {
                  if (word["SelectionStatus"] === "SELECTED") text += "X ";
                }
              }
            }
          }
        }
      
        return text.trim();
    }
    /*
    generateTableJSON(table_result, blocks_map, table_index) {
        const rows = this.getRowsColumnsMap(table_result, blocks_map);
        
        return rows;
    }
    */
      
    getTableJSONResults(response) {
        const blocks = response["Blocks"];
      
        const blocks_map = {};
        const table_blocks: any[] = [];
        
        let rows;
        for (let block of blocks) {
          blocks_map[block["Id"]] = block;
          if (block["BlockType"] === "TABLE") table_blocks.push(block);
        }
      
        const LENGTH_OF_TABLE_BLOCKS = table_blocks.length;
      
        if (LENGTH_OF_TABLE_BLOCKS <= 0) return "<b> NO TABLE FOUND </b>";
      
      
        for (let index = 0; index < LENGTH_OF_TABLE_BLOCKS; index += 1) {
            rows = this.getRowsColumnsMap(table_blocks[index], blocks_map);
        }
      
        return rows
    }

  

}