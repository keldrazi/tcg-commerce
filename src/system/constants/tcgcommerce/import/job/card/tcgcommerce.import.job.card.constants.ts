export const IMPORT_JOB_CARD_STATUS = {
    UPLOADING: 'UPLOADING',
    PROCESSING: 'PROCESSING',
    PROCESSING_FILE: 'PROCESSING FILE',
    READY_FOR_REVIEW: 'READY FOR REVIEW',
    REJECTED: 'REJECTED',
    COMPLETE: 'COMPLETE',
    FAILED: 'FAILED',

}

export const IMPORT_SORT_CARD_TYPE_NAME = {
    ROCA: 'Roca',
    TCG_PLAYER: 'TCG Player',
    PHYZBATCH: 'PhyzBatch',
}

export const IMPORT_JOB_CARD_UPLOAD_FILE_BUCKET_PATH = {
    ROCA: '/import/job/card/roca/upload/',
    TCG_PLAYER: '/import/job/card/tcgplayer/upload/',
    PHYZBATCH: '/import/job/card/phyzbatch/upload/'
}

export const IMPORT_JOB_CARD_PDF_FILE_BUCKET_PATH = {
    ROCA: '/import/job/card/roca/pdf/',
    TCG_PLAYER: '/import/job/card/tcgplayer/pdf/',
    PHYZBATCH: '/import/job/card/phyzbatch/pdf/'
}

export const IMPORT_SORT_CARD_CONDITION = {
    NEAR_MINT: 'NM',
    LIGHTLY_PLAYED: 'LP',
    MODERATELY_PLAYED: 'MP',
    HEAVILY_PLAYED: 'HP',
    DAMAGED: 'D'
}

export const IMPORT_SORT_ROCA_CARD_DATA_KEYS = {
    CARD_TCG_PLAYER_ID: 'TCGplayer Id',
    CARD_SET_NAME: 'Set Name',
    CARD_NAME: 'Product Name',
    CARD_NUMBER: 'Number',
    CARD_CONDITION: 'Condition',
    CARD_TCG_PLAYER_MARKET_PRICE: 'TCG Market Price',
    CARD_TCG_PLAYER_LOW_PRICE: 'TCG Low Price',
    CARD_QTY: 'Add to Quantity'
}

export const IMPORT_SORT_PHYZBATCH_CARD_DATA_KEYS = {
    CARD_TCG_PLAYER_ID: 'TCGplayer Id',
    CARD_SET_NAME: 'Set Name',
    CARD_NAME: 'Product Name',
    CARD_NUMBER: 'Number',
    CARD_CONDITION: 'Condition',
    CARD_TCG_PLAYER_MARKET_PRICE: 'TCG Market Price',
    CARD_TCG_PLAYER_LOW_PRICE: 'TCG Low Price',
    CARD_QTY: 'Add to Quantity'
}

export const IMPORT_SORT_TCGPLAYER_CARD_DATA_KEYS = {
    CARD_TCG_PLAYER_ID: 'TCGplayer Id',
    CARD_SET_NAME: 'Set Name',
    CARD_NAME: 'Product Name',
    CARD_NUMBER: 'Number',
    CARD_CONDITION: 'Condition',
    CARD_TCG_PLAYER_MARKET_PRICE: 'TCG Market Price',
    CARD_TCG_PLAYER_LOW_PRICE: 'TCG Low Price',
    CARD_QTY: 'Add to Quantity'
}

export const IMPORT_SORT_CARD_PRINTING = {
    FOIL: 'Foil',
    NORMAL: 'Normal',
}

export const IMPORT_JOB_CARD_PRODUCT_LINE = {
    MTG: 'MTG',
    PKE: 'PKE'
}