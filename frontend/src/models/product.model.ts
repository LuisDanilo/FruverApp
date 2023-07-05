/**
 * Modelo Product
 */
export class Product {
    constructor(
        public id: string,
        public name: string,
        public detail: string,
        public price: number,
        public available_units: number,
    ) { }
}