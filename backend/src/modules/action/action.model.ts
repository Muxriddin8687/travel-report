export interface ActionModel {
    id: number,
    name: string,
    phone: string,
    address: string,
    travel_type_id: number,
    travel_type_name: string,
    person_count: number,
    summ: number,
    duration: string,
    user_id: string,
    date: string,
    items: ActionItemModel[]
}

export interface ActionItemModel {
    id: number,
    action_id: number,
    service_id: number,
    service_name: string,
    comment: string,
    price: number
}