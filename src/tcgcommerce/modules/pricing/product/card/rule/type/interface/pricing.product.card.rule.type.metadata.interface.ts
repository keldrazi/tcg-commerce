export interface PricingProductCardRuleTypeMetadata {
    metadata: {
        fields: [
            {
                id: string;
                type: string;
                label: string;
                sub_label: string;
                information: string;
                options: [
                    {
                        value: boolean;
                        label: string;
                    }
                ];
                default: string;
                validation: [
                    {
                        type: string;
                        message: string;
                    }
                ];
                enabled: boolean;
                enables: string[];
            }
        ]
    }
}