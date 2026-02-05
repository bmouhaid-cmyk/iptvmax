export const PRICING_PLANS = [
    {
        id: '24h-test',
        title: '24 Hours Test',
        price: '0.99',
        prices: {
            EUR: '0.99',
            USD: '1.10',
            MAD: '11',
            USDT: '1.10'
        },
        duration: '24 Hours',
        features: ['Full Access', '15,000+ Channels', '4K & FHD Quality', 'Movies & Series', 'No Buffering'],
        linkParam: '24h-test'
    },
    {
        id: '3-months',
        title: '3 Months',
        price: '19.00',
        prices: {
            EUR: '19.00',
            USD: '21.00',
            MAD: '210',
            USDT: '21.00'
        },
        duration: '3 Months',
        features: ['15,000+ Channels', '4K & FHD Quality', 'Movies & Series', 'No Buffering', '24/7 Support'],
        linkParam: '3-months'
    },
    {
        id: '6-months',
        title: '6 Months',
        price: '32.00',
        prices: {
            EUR: '32.00',
            USD: '35.00',
            MAD: '350',
            USDT: '35.00'
        },
        duration: '6 Months',
        features: ['15,000+ Channels', '4K & FHD Quality', 'Movies & Series', 'No Buffering', 'Priority Support'],
        popular: true,
        linkParam: '6-months'
    },
    {
        id: '12-months',
        title: '12 Months',
        price: '59.00',
        prices: {
            EUR: '59.00',
            USD: '65.00',
            MAD: '650',
            USDT: '65.00'
        },
        duration: '12 Months',
        features: ['15,000+ Channels', '4K & FHD Quality', 'Movies & Series', 'No Buffering', 'VIP Support'],
        linkParam: '12-months'
    }
]
