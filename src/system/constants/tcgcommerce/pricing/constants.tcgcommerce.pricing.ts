export const PRICING_PRODUCT_RULE_CODES = [
    'base-price',
    'condition-price'
]

export const PRICING_PRODUCT_CARD_RULE_TYPE_CODE = {
    BASE_PRICE: 'base-price',
    CONDITION_PRICE: 'condition-price'
}

export const BASE_PRICE = {
    BASE_PRICE: 'base-price',
    MINIMUM_PRICE_ENABLED: 'minimum-price-enabled',
    MINIMUM_PRICE: 'minimum-price',
    ROUNDING_PRICE_ENABLED: 'rounding-price-enabled',
}

export const BASE_PRICE_VALUES = {
    LOW: 'tcgplayer_low',
    MARKET: 'tcgplayer_market',
}

export const CONDITION_PRICE = {
    CONDITION_PRICE_PERCENTAGE_NM: 'condition-price-percentage-nm',
    CONDITION_PRICE_PERCENTAGE_LP: 'condition-price-percentage-lp',
    CONDITION_PRICE_PERCENTAGE_MP: 'condition-price-percentage-mp',
    CONDITION_PRICE_PERCENTAGE_HP: 'condition-price-percentage-hp',
    CONDITION_PRICE_PERCENTAGE_DM: 'condition-price-percentage-dm'
}

export const CONDITION_PRICE_ABBREVIATION = {
    NM: 'condition-price-percentage-nm',
    LP: 'condition-price-percentage-lp',
    MP: 'condition-price-percentage-mp',
    HP: 'condition-price-percentage-hp',
    DM: 'condition-price-percentage-dm'
}

export const BASE_PRICE_DEFAULT_RULE_SET = {
    BASE_PRICE: 'tcgplayer_low',
    MINIMUM_PRICE_ENABLED: false,
    MINIMUM_PRICE: 0.00,
    ROUNDING_PRICE_ENABLED: false
}

export const CONDITION_PRICE_DEFAULT_RULE_SET = {
    CONDITION_PRICE_PERCENTAGE_NM: 100,
    CONDITION_PRICE_PERCENTAGE_LP: 90,
    CONDITION_PRICE_PERCENTAGE_MP: 80,
    CONDITION_PRICE_PERCENTAGE_HP: 60,
    CONDITION_PRICE_PERCENTAGE_DM: 50
}

