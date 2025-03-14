<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            ['name' => 'Cement Bag', 'unit' => 'bag', 'buy_price' => 12000, 'sell_price' => 15000, 'stock' => 100, 'stock_alert' => 10],
            ['name' => 'Iron Rod', 'unit' => 'piece', 'buy_price' => 8000, 'sell_price' => 10000, 'stock' => 200, 'stock_alert' => 20],
            ['name' => 'Brick', 'unit' => 'piece', 'buy_price' => 500, 'sell_price' => 700, 'stock' => 1000, 'stock_alert' => 100],
            ['name' => 'Roofing Sheet', 'unit' => 'sheet', 'buy_price' => 25000, 'sell_price' => 30000, 'stock' => 50, 'stock_alert' => 5],
            ['name' => 'Paint Bucket', 'unit' => 'bucket', 'buy_price' => 30000, 'sell_price' => 35000, 'stock' => 80, 'stock_alert' => 10],
            ['name' => 'Sand (Ton)', 'unit' => 'ton', 'buy_price' => 70000, 'sell_price' => 90000, 'stock' => 20, 'stock_alert' => 5],
            ['name' => 'Gravel (Ton)', 'unit' => 'ton', 'buy_price' => 60000, 'sell_price' => 85000, 'stock' => 15, 'stock_alert' => 5],
            ['name' => 'Plumbing Pipe', 'unit' => 'meter', 'buy_price' => 3000, 'sell_price' => 5000, 'stock' => 500, 'stock_alert' => 50],
            ['name' => 'Nails (Kg)', 'unit' => 'kg', 'buy_price' => 1500, 'sell_price' => 2000, 'stock' => 300, 'stock_alert' => 30],
            ['name' => 'Hammer', 'unit' => 'piece', 'buy_price' => 5000, 'sell_price' => 8000, 'stock' => 40, 'stock_alert' => 5],
            ['name' => 'Shovel', 'unit' => 'piece', 'buy_price' => 7000, 'sell_price' => 10000, 'stock' => 60, 'stock_alert' => 10],
            ['name' => 'Wheelbarrow', 'unit' => 'piece', 'buy_price' => 40000, 'sell_price' => 50000, 'stock' => 30, 'stock_alert' => 5],
            ['name' => 'Concrete Mixer', 'unit' => 'piece', 'buy_price' => 1200000, 'sell_price' => 1500000, 'stock' => 5, 'stock_alert' => 1],
            ['name' => 'Ladder', 'unit' => 'piece', 'buy_price' => 25000, 'sell_price' => 30000, 'stock' => 20, 'stock_alert' => 5],
            ['name' => 'Drill Machine', 'unit' => 'piece', 'buy_price' => 80000, 'sell_price' => 100000, 'stock' => 10, 'stock_alert' => 2],
            ['name' => 'Spade', 'unit' => 'piece', 'buy_price' => 6000, 'sell_price' => 9000, 'stock' => 70, 'stock_alert' => 10],
            ['name' => 'Safety Helmet', 'unit' => 'piece', 'buy_price' => 3000, 'sell_price' => 5000, 'stock' => 150, 'stock_alert' => 20],
            ['name' => 'Gloves', 'unit' => 'pair', 'buy_price' => 1000, 'sell_price' => 1500, 'stock' => 200, 'stock_alert' => 30],
            ['name' => 'Leveling Tool', 'unit' => 'piece', 'buy_price' => 20000, 'sell_price' => 25000, 'stock' => 15, 'stock_alert' => 3],
            ['name' => 'Measuring Tape', 'unit' => 'piece', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 50, 'stock_alert' => 5],
            ['name' => 'PVC Pipe', 'unit' => 'meter', 'buy_price' => 3000, 'sell_price' => 4500, 'stock' => 300, 'stock_alert' => 50],
            ['name' => 'Electric Cable', 'unit' => 'meter', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 500, 'stock_alert' => 100],
            ['name' => 'Socket', 'unit' => 'piece', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 100, 'stock_alert' => 10],
            ['name' => 'Switch', 'unit' => 'piece', 'buy_price' => 1500, 'sell_price' => 2500, 'stock' => 100, 'stock_alert' => 10],
            ['name' => 'Bulb', 'unit' => 'piece', 'buy_price' => 500, 'sell_price' => 800, 'stock' => 300, 'stock_alert' => 50],
            ['name' => 'Fuse Box', 'unit' => 'piece', 'buy_price' => 10000, 'sell_price' => 15000, 'stock' => 30, 'stock_alert' => 5],
            ['name' => 'Steel Door Frame', 'unit' => 'piece', 'buy_price' => 60000, 'sell_price' => 80000, 'stock' => 10, 'stock_alert' => 2],
            ['name' => 'Window Frame', 'unit' => 'piece', 'buy_price' => 30000, 'sell_price' => 45000, 'stock' => 20, 'stock_alert' => 3],
            ['name' => 'Trowel', 'unit' => 'piece', 'buy_price' => 4000, 'sell_price' => 6000, 'stock' => 50, 'stock_alert' => 10],
            ['name' => 'Cutter', 'unit' => 'piece', 'buy_price' => 20000, 'sell_price' => 30000, 'stock' => 20, 'stock_alert' => 3],
        ];
        

        foreach ($products as $product) {
            Product::create(array_merge($product, [
                'branch_id' => 1,
                'unique_id' => uniqid('prod_'),
                'expired_date' => null,
                'whole_price' => $product['sell_price'] - 2000, // Example wholesale pricing logic
                'whole_stock' => $product['stock'] / 2, // Example wholesale stock logic
            ]));
        }

        // // Add 20 additional random products
        // Product::factory(20)->create([
        //     'branch_id' => 1,
        //     'expired_date' => null,
        // ]);
    }
}
