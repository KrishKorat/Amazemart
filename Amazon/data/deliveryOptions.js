import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export let deliveryOptions = [{
    deliveryId: '1',
    deliveryDays: 7,
    deliveryCost: 0
}, {
    deliveryId: '2',
    deliveryDays: 3,
    deliveryCost: 499
}, {
    deliveryId: '3',
    deliveryDays: 1,
    deliveryCost: 999
}];

export function getDeliveryOption(cartDeliveryId) {
    let deliveryOption;

    deliveryOptions.forEach((delOption) => {
    if(delOption.deliveryId === cartDeliveryId) { // Getting delivery info same as cart's delivery id
        deliveryOption = delOption;
    }
    });

    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {

    // Getting and Turning date in good format
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    
    return deliveryDate.format('dddd, MMMM D');
}