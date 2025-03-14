<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class HardwareProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            ['branch_id' => 2, 'name' => 'Hammer', 'unit' => 'piece', 'buy_price' => 5000, 'sell_price' => 8000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 2, 'name' => 'Screwdriver Set', 'unit' => 'set', 'buy_price' => 10000, 'sell_price' => 15000, 'stock' => 30, 'stock_alert' => 5],
            ['branch_id' => 2, 'name' => 'Pliers', 'unit' => 'piece', 'buy_price' => 7000, 'sell_price' => 10000, 'stock' => 40, 'stock_alert' => 10],
            ['branch_id' => 2, 'name' => 'Adjustable Wrench', 'unit' => 'piece', 'buy_price' => 12000, 'sell_price' => 15000, 'stock' => 20, 'stock_alert' => 5],
            ['branch_id' => 2, 'name' => 'Tape Measure', 'unit' => 'piece', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 60, 'stock_alert' => 10],
            ['branch_id' => 2, 'name' => 'Electric Drill', 'unit' => 'piece', 'buy_price' => 80000, 'sell_price' => 100000, 'stock' => 15, 'stock_alert' => 3],
            ['branch_id' => 2, 'name' => 'Saw', 'unit' => 'piece', 'buy_price' => 12000, 'sell_price' => 15000, 'stock' => 25, 'stock_alert' => 5],
            ['branch_id' => 2, 'name' => 'Ladder', 'unit' => 'piece', 'buy_price' => 30000, 'sell_price' => 40000, 'stock' => 10, 'stock_alert' => 2],
            ['branch_id' => 2, 'name' => 'Wheelbarrow', 'unit' => 'piece', 'buy_price' => 50000, 'sell_price' => 60000, 'stock' => 8, 'stock_alert' => 2],
            ['branch_id' => 2, 'name' => 'Spade', 'unit' => 'piece', 'buy_price' => 6000, 'sell_price' => 9000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 2, 'name' => 'Trowel', 'unit' => 'piece', 'buy_price' => 4000, 'sell_price' => 6000, 'stock' => 70, 'stock_alert' => 15],
            ['branch_id' => 2, 'name' => 'Paint Roller', 'unit' => 'piece', 'buy_price' => 3000, 'sell_price' => 5000, 'stock' => 100, 'stock_alert' => 20],
            ['branch_id' => 2, 'name' => 'Paint Brush', 'unit' => 'piece', 'buy_price' => 2000, 'sell_price' => 4000, 'stock' => 150, 'stock_alert' => 30],
            ['branch_id' => 2, 'name' => 'Steel Rod', 'unit' => 'piece', 'buy_price' => 12000, 'sell_price' => 15000, 'stock' => 100, 'stock_alert' => 10],
            ['branch_id' => 2, 'name' => 'Roofing Nails (Kg)', 'unit' => 'kg', 'buy_price' => 2500, 'sell_price' => 3500, 'stock' => 200, 'stock_alert' => 30],
            ['branch_id' => 2, 'name' => 'PVC Pipe (Meter)', 'unit' => 'meter', 'buy_price' => 3000, 'sell_price' => 4500, 'stock' => 300, 'stock_alert' => 50],
            ['branch_id' => 2, 'name' => 'Electric Cable (Meter)', 'unit' => 'meter', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 500, 'stock_alert' => 100],
            ['branch_id' => 2, 'name' => 'Socket', 'unit' => 'piece', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 80, 'stock_alert' => 10],
            ['branch_id' => 2, 'name' => 'Switch', 'unit' => 'piece', 'buy_price' => 1500, 'sell_price' => 2500, 'stock' => 90, 'stock_alert' => 10],
            ['branch_id' => 2, 'name' => 'Bulb', 'unit' => 'piece', 'buy_price' => 500, 'sell_price' => 800, 'stock' => 300, 'stock_alert' => 50],
            ['branch_id' => 2, 'name' => 'Safety Helmet', 'unit' => 'piece', 'buy_price' => 3000, 'sell_price' => 5000, 'stock' => 150, 'stock_alert' => 20],
            ['branch_id' => 2, 'name' => 'Safety Gloves', 'unit' => 'pair', 'buy_price' => 1000, 'sell_price' => 1500, 'stock' => 200, 'stock_alert' => 30],
            ['branch_id' => 2, 'name' => 'Concrete Mixer', 'unit' => 'piece', 'buy_price' => 1200000, 'sell_price' => 1500000, 'stock' => 5, 'stock_alert' => 1],
            ['branch_id' => 2, 'name' => 'Grinder', 'unit' => 'piece', 'buy_price' => 70000, 'sell_price' => 90000, 'stock' => 12, 'stock_alert' => 3],
            ['branch_id' => 2, 'name' => 'Cement Bag', 'unit' => 'bag', 'buy_price' => 12000, 'sell_price' => 15000, 'stock' => 100, 'stock_alert' => 20],
            ['branch_id' => 2, 'name' => 'Sand (Ton)', 'unit' => 'ton', 'buy_price' => 70000, 'sell_price' => 90000, 'stock' => 20, 'stock_alert' => 5],
            ['branch_id' => 2, 'name' => 'Gravel (Ton)', 'unit' => 'ton', 'buy_price' => 60000, 'sell_price' => 85000, 'stock' => 15, 'stock_alert' => 5],
            ['branch_id' => 2, 'name' => 'Steel Door Frame', 'unit' => 'piece', 'buy_price' => 60000, 'sell_price' => 80000, 'stock' => 10, 'stock_alert' => 2],
            ['branch_id' => 2, 'name' => 'Window Frame', 'unit' => 'piece', 'buy_price' => 30000, 'sell_price' => 45000, 'stock' => 20, 'stock_alert' => 3],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
