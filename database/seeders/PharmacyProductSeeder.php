<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PharmacyProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            ['branch_id' => 4, 'name' => 'Paracetamol (500mg)', 'unit' => 'box', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 100, 'stock_alert' => 20],
            ['branch_id' => 4, 'name' => 'Ibuprofen (200mg)', 'unit' => 'box', 'buy_price' => 2500, 'sell_price' => 4000, 'stock' => 80, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Amoxicillin (500mg)', 'unit' => 'box', 'buy_price' => 4500, 'sell_price' => 6000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Cough Syrup (100ml)', 'unit' => 'bottle', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 40, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Vitamin C (500mg)', 'unit' => 'bottle', 'buy_price' => 3000, 'sell_price' => 4500, 'stock' => 60, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Multivitamins (Bottle of 30)', 'unit' => 'bottle', 'buy_price' => 8000, 'sell_price' => 12000, 'stock' => 30, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Zinc Tablets (50mg)', 'unit' => 'box', 'buy_price' => 3000, 'sell_price' => 4000, 'stock' => 70, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Antacid Tablets', 'unit' => 'box', 'buy_price' => 2500, 'sell_price' => 3500, 'stock' => 80, 'stock_alert' => 20],
            ['branch_id' => 4, 'name' => 'ORS Sachets', 'unit' => 'box', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 100, 'stock_alert' => 30],
            ['branch_id' => 4, 'name' => 'Bandages (Roll)', 'unit' => 'roll', 'buy_price' => 1000, 'sell_price' => 1500, 'stock' => 150, 'stock_alert' => 30],
            ['branch_id' => 4, 'name' => 'Plasters (Box)', 'unit' => 'box', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 90, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Glucose Powder (500g)', 'unit' => 'packet', 'buy_price' => 4500, 'sell_price' => 6000, 'stock' => 40, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Antiseptic Liquid (500ml)', 'unit' => 'bottle', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 60, 'stock_alert' => 20],
            ['branch_id' => 4, 'name' => 'Digital Thermometer', 'unit' => 'piece', 'buy_price' => 10000, 'sell_price' => 15000, 'stock' => 20, 'stock_alert' => 5],
            ['branch_id' => 4, 'name' => 'Face Masks (Box of 50)', 'unit' => 'box', 'buy_price' => 15000, 'sell_price' => 20000, 'stock' => 50, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Hand Sanitizer (500ml)', 'unit' => 'bottle', 'buy_price' => 8000, 'sell_price' => 12000, 'stock' => 40, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Medical Gloves (Box of 100)', 'unit' => 'box', 'buy_price' => 20000, 'sell_price' => 25000, 'stock' => 30, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Eye Drops (10ml)', 'unit' => 'bottle', 'buy_price' => 2000, 'sell_price' => 3500, 'stock' => 70, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Cold Compress Gel Pack', 'unit' => 'piece', 'buy_price' => 10000, 'sell_price' => 15000, 'stock' => 20, 'stock_alert' => 5],
            ['branch_id' => 4, 'name' => 'Hot Water Bottle', 'unit' => 'piece', 'buy_price' => 15000, 'sell_price' => 20000, 'stock' => 15, 'stock_alert' => 5],
            ['branch_id' => 4, 'name' => 'Nebulizer Machine', 'unit' => 'piece', 'buy_price' => 80000, 'sell_price' => 100000, 'stock' => 10, 'stock_alert' => 2],
            ['branch_id' => 4, 'name' => 'Blood Pressure Monitor', 'unit' => 'piece', 'buy_price' => 70000, 'sell_price' => 90000, 'stock' => 8, 'stock_alert' => 2],
            ['branch_id' => 4, 'name' => 'First Aid Kit', 'unit' => 'kit', 'buy_price' => 50000, 'sell_price' => 70000, 'stock' => 12, 'stock_alert' => 3],
            ['branch_id' => 4, 'name' => 'Anti-Dandruff Shampoo (200ml)', 'unit' => 'bottle', 'buy_price' => 8000, 'sell_price' => 10000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Mouthwash (500ml)', 'unit' => 'bottle', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 60, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Toothpaste (100ml)', 'unit' => 'tube', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 90, 'stock_alert' => 25],
            ['branch_id' => 4, 'name' => 'Hair Oil (200ml)', 'unit' => 'bottle', 'buy_price' => 3000, 'sell_price' => 4500, 'stock' => 60, 'stock_alert' => 20],
            ['branch_id' => 4, 'name' => 'Pain Relief Gel (30g)', 'unit' => 'tube', 'buy_price' => 3000, 'sell_price' => 4000, 'stock' => 70, 'stock_alert' => 20],
            ['branch_id' => 4, 'name' => 'Pregnancy Test Kit', 'unit' => 'piece', 'buy_price' => 5000, 'sell_price' => 8000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Cotton Wool (500g)', 'unit' => 'packet', 'buy_price' => 3500, 'sell_price' => 5000, 'stock' => 100, 'stock_alert' => 30],
            ['branch_id' => 4, 'name' => 'Metronidazole (200mg)', 'unit' => 'box', 'buy_price' => 3000, 'sell_price' => 4000, 'stock' => 80, 'stock_alert' => 20],
            ['branch_id' => 4, 'name' => 'Cetirizine Tablets (10mg)', 'unit' => 'box', 'buy_price' => 2500, 'sell_price' => 3500, 'stock' => 70, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Loratadine (10mg)', 'unit' => 'box', 'buy_price' => 3500, 'sell_price' => 5000, 'stock' => 60, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Diclofenac Gel (30g)', 'unit' => 'tube', 'buy_price' => 3000, 'sell_price' => 4500, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Salbutamol Inhaler (100mcg)', 'unit' => 'piece', 'buy_price' => 10000, 'sell_price' => 15000, 'stock' => 30, 'stock_alert' => 5],
            ['branch_id' => 4, 'name' => 'Hydrocortisone Cream (1%)', 'unit' => 'tube', 'buy_price' => 4000, 'sell_price' => 6000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Ranitidine (150mg)', 'unit' => 'box', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 90, 'stock_alert' => 20],
            ['branch_id' => 4, 'name' => 'Omeprazole (20mg)', 'unit' => 'box', 'buy_price' => 4500, 'sell_price' => 6500, 'stock' => 60, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Coartem Tablets (80/480mg)', 'unit' => 'box', 'buy_price' => 8000, 'sell_price' => 12000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Cotrimoxazole (480mg)', 'unit' => 'box', 'buy_price' => 3000, 'sell_price' => 5000, 'stock' => 70, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Azithromycin (250mg)', 'unit' => 'box', 'buy_price' => 10000, 'sell_price' => 15000, 'stock' => 40, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Chlorhexidine Gel (7.1%)', 'unit' => 'tube', 'buy_price' => 4000, 'sell_price' => 6000, 'stock' => 60, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Insulin Syringes (Box of 100)', 'unit' => 'box', 'buy_price' => 20000, 'sell_price' => 25000, 'stock' => 20, 'stock_alert' => 5],
            ['branch_id' => 4, 'name' => 'Diabetic Test Strips (Box of 50)', 'unit' => 'box', 'buy_price' => 30000, 'sell_price' => 40000, 'stock' => 10, 'stock_alert' => 3],
            ['branch_id' => 4, 'name' => 'Alcohol Swabs (Box of 100)', 'unit' => 'box', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Povidone Iodine Solution (500ml)', 'unit' => 'bottle', 'buy_price' => 8000, 'sell_price' => 12000, 'stock' => 30, 'stock_alert' => 5],
            ['branch_id' => 4, 'name' => 'Antifungal Cream (Clotrimazole 1%)', 'unit' => 'tube', 'buy_price' => 4000, 'sell_price' => 6000, 'stock' => 60, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Antihistamine Syrup (100ml)', 'unit' => 'bottle', 'buy_price' => 6000, 'sell_price' => 8000, 'stock' => 40, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Surgical Scissors', 'unit' => 'piece', 'buy_price' => 10000, 'sell_price' => 15000, 'stock' => 20, 'stock_alert' => 5],
            ['branch_id' => 4, 'name' => 'Elastic Bandages (Roll)', 'unit' => 'roll', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 70, 'stock_alert' => 20],
            ['branch_id' => 4, 'name' => 'Nasal Spray (Saline, 20ml)', 'unit' => 'bottle', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 40, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Lactulose Solution (500ml)', 'unit' => 'bottle', 'buy_price' => 10000, 'sell_price' => 15000, 'stock' => 30, 'stock_alert' => 5],
            ['branch_id' => 4, 'name' => 'Antidiarrheal Tablets (Loperamide)', 'unit' => 'box', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 80, 'stock_alert' => 20],
            ['branch_id' => 4, 'name' => 'Surgical Masks (Box of 50)', 'unit' => 'box', 'buy_price' => 15000, 'sell_price' => 20000, 'stock' => 30, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Disposable Syringes (Box of 100)', 'unit' => 'box', 'buy_price' => 20000, 'sell_price' => 25000, 'stock' => 20, 'stock_alert' => 5],
            ['branch_id' => 4, 'name' => 'Blood Lancets (Box of 100)', 'unit' => 'box', 'buy_price' => 8000, 'sell_price' => 12000, 'stock' => 40, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Oral Rinse (Chlorhexidine, 500ml)', 'unit' => 'bottle', 'buy_price' => 10000, 'sell_price' => 15000, 'stock' => 30, 'stock_alert' => 5],
            ['branch_id' => 4, 'name' => 'Throat Lozenges (Box)', 'unit' => 'box', 'buy_price' => 2500, 'sell_price' => 3500, 'stock' => 60, 'stock_alert' => 15],
            ['branch_id' => 4, 'name' => 'Medicated Soap (100g)', 'unit' => 'piece', 'buy_price' => 3000, 'sell_price' => 5000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 4, 'name' => 'Infant Formula (400g)', 'unit' => 'tin', 'buy_price' => 15000, 'sell_price' => 20000, 'stock' => 30, 'stock_alert' => 5],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
        
    }
}
