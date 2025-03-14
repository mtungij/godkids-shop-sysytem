<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class SupermarketProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            ['branch_id' => 3, 'name' => 'Maize Flour (2kg)', 'unit' => 'bag', 'buy_price' => 2500, 'sell_price' => 3000, 'stock' => 100, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Wheat Flour (2kg)', 'unit' => 'bag', 'buy_price' => 2800, 'sell_price' => 3500, 'stock' => 80, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Cooking Oil (5L)', 'unit' => 'bottle', 'buy_price' => 12000, 'sell_price' => 15000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Rice (5kg)', 'unit' => 'bag', 'buy_price' => 10000, 'sell_price' => 12000, 'stock' => 60, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Sugar (1kg)', 'unit' => 'bag', 'buy_price' => 2000, 'sell_price' => 2500, 'stock' => 150, 'stock_alert' => 30],
            ['branch_id' => 3, 'name' => 'Salt (1kg)', 'unit' => 'bag', 'buy_price' => 500, 'sell_price' => 800, 'stock' => 200, 'stock_alert' => 50],
            ['branch_id' => 3, 'name' => 'Tea Leaves (250g)', 'unit' => 'packet', 'buy_price' => 1500, 'sell_price' => 2000, 'stock' => 100, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Coffee (250g)', 'unit' => 'packet', 'buy_price' => 2500, 'sell_price' => 3500, 'stock' => 80, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Biscuits (1kg)', 'unit' => 'packet', 'buy_price' => 4000, 'sell_price' => 5000, 'stock' => 70, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Milk (1L)', 'unit' => 'bottle', 'buy_price' => 2000, 'sell_price' => 2500, 'stock' => 120, 'stock_alert' => 30],
            ['branch_id' => 3, 'name' => 'Yogurt (500ml)', 'unit' => 'bottle', 'buy_price' => 1500, 'sell_price' => 2000, 'stock' => 100, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Cheese (250g)', 'unit' => 'piece', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 50, 'stock_alert' => 5],
            ['branch_id' => 3, 'name' => 'Butter (250g)', 'unit' => 'packet', 'buy_price' => 4000, 'sell_price' => 5000, 'stock' => 60, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Toothpaste (200g)', 'unit' => 'tube', 'buy_price' => 3000, 'sell_price' => 4000, 'stock' => 80, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Bath Soap (250g)', 'unit' => 'bar', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 100, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Detergent Powder (1kg)', 'unit' => 'packet', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Bleach (1L)', 'unit' => 'bottle', 'buy_price' => 3000, 'sell_price' => 4000, 'stock' => 70, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Toilet Paper (4 Rolls)', 'unit' => 'pack', 'buy_price' => 2500, 'sell_price' => 3500, 'stock' => 100, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Shampoo (500ml)', 'unit' => 'bottle', 'buy_price' => 6000, 'sell_price' => 8000, 'stock' => 40, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Conditioner (500ml)', 'unit' => 'bottle', 'buy_price' => 6000, 'sell_price' => 8000, 'stock' => 40, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Hand Sanitizer (500ml)', 'unit' => 'bottle', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 60, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Cooking Gas (6kg)', 'unit' => 'cylinder', 'buy_price' => 20000, 'sell_price' => 25000, 'stock' => 30, 'stock_alert' => 5],
            ['branch_id' => 3, 'name' => 'Bread (1 Loaf)', 'unit' => 'piece', 'buy_price' => 1500, 'sell_price' => 2000, 'stock' => 200, 'stock_alert' => 50],
            ['branch_id' => 3, 'name' => 'Soft Drinks (500ml)', 'unit' => 'bottle', 'buy_price' => 800, 'sell_price' => 1000, 'stock' => 300, 'stock_alert' => 50],
            ['branch_id' => 3, 'name' => 'Juice (1L)', 'unit' => 'bottle', 'buy_price' => 4000, 'sell_price' => 5000, 'stock' => 60, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Frozen Chicken (1kg)', 'unit' => 'bag', 'buy_price' => 8000, 'sell_price' => 10000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Eggs (Tray)', 'unit' => 'tray', 'buy_price' => 8000, 'sell_price' => 10000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Peanut Butter (500g)', 'unit' => 'jar', 'buy_price' => 4000, 'sell_price' => 5000, 'stock' => 70, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Cereal (1kg)', 'unit' => 'packet', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 80, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Ice Cream (500ml)', 'unit' => 'tub', 'buy_price' => 4000, 'sell_price' => 5000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Detergent Liquid (1L)', 'unit' => 'bottle', 'buy_price' => 4500, 'sell_price' => 6000, 'stock' => 80, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Laundry Bar Soap (1kg)', 'unit' => 'bar', 'buy_price' => 2500, 'sell_price' => 3500, 'stock' => 100, 'stock_alert' => 25],
            ['branch_id' => 3, 'name' => 'Fabric Softener (1L)', 'unit' => 'bottle', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Spaghetti (500g)', 'unit' => 'packet', 'buy_price' => 1500, 'sell_price' => 2000, 'stock' => 120, 'stock_alert' => 30],
            ['branch_id' => 3, 'name' => 'Macaroni (500g)', 'unit' => 'packet', 'buy_price' => 1500, 'sell_price' => 2000, 'stock' => 110, 'stock_alert' => 25],
            ['branch_id' => 3, 'name' => 'Tomato Sauce (500ml)', 'unit' => 'bottle', 'buy_price' => 2500, 'sell_price' => 3500, 'stock' => 100, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Chili Sauce (500ml)', 'unit' => 'bottle', 'buy_price' => 2500, 'sell_price' => 3500, 'stock' => 90, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Honey (500g)', 'unit' => 'jar', 'buy_price' => 6000, 'sell_price' => 8000, 'stock' => 40, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Jam (500g)', 'unit' => 'jar', 'buy_price' => 4000, 'sell_price' => 5000, 'stock' => 60, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Peas (1kg)', 'unit' => 'packet', 'buy_price' => 3000, 'sell_price' => 4000, 'stock' => 70, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Lentils (1kg)', 'unit' => 'packet', 'buy_price' => 3500, 'sell_price' => 4500, 'stock' => 60, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Canned Tuna (185g)', 'unit' => 'can', 'buy_price' => 2500, 'sell_price' => 3500, 'stock' => 90, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Canned Beans (400g)', 'unit' => 'can', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 80, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Canned Corn (400g)', 'unit' => 'can', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 70, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Cornflakes (500g)', 'unit' => 'box', 'buy_price' => 4500, 'sell_price' => 6000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Oatmeal (1kg)', 'unit' => 'packet', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 60, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Bottled Water (1.5L)', 'unit' => 'bottle', 'buy_price' => 800, 'sell_price' => 1000, 'stock' => 300, 'stock_alert' => 50],
            ['branch_id' => 3, 'name' => 'Mineral Water (5L)', 'unit' => 'bottle', 'buy_price' => 3000, 'sell_price' => 4000, 'stock' => 80, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Energy Drink (250ml)', 'unit' => 'can', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 90, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Chocolate Bar (100g)', 'unit' => 'piece', 'buy_price' => 2500, 'sell_price' => 3500, 'stock' => 120, 'stock_alert' => 30],
            ['branch_id' => 3, 'name' => 'Candy (1kg)', 'unit' => 'bag', 'buy_price' => 4000, 'sell_price' => 5000, 'stock' => 80, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Potato Chips (200g)', 'unit' => 'packet', 'buy_price' => 2000, 'sell_price' => 2500, 'stock' => 100, 'stock_alert' => 25],
            ['branch_id' => 3, 'name' => 'Popcorn (100g)', 'unit' => 'packet', 'buy_price' => 1000, 'sell_price' => 1500, 'stock' => 120, 'stock_alert' => 30],
            ['branch_id' => 3, 'name' => 'Frozen Peas (1kg)', 'unit' => 'bag', 'buy_price' => 5000, 'sell_price' => 7000, 'stock' => 40, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Frozen Spinach (500g)', 'unit' => 'bag', 'buy_price' => 3500, 'sell_price' => 5000, 'stock' => 50, 'stock_alert' => 10],
            ['branch_id' => 3, 'name' => 'Garlic Paste (250g)', 'unit' => 'jar', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 100, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Ginger Paste (250g)', 'unit' => 'jar', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 100, 'stock_alert' => 20],
            ['branch_id' => 3, 'name' => 'Coconut Milk (400ml)', 'unit' => 'can', 'buy_price' => 3000, 'sell_price' => 4000, 'stock' => 90, 'stock_alert' => 15],
            ['branch_id' => 3, 'name' => 'Instant Noodles (1 pack)', 'unit' => 'packet', 'buy_price' => 500, 'sell_price' => 800, 'stock' => 200, 'stock_alert' => 50],
            ['branch_id' => 3, 'name' => 'Soy Sauce (250ml)', 'unit' => 'bottle', 'buy_price' => 2000, 'sell_price' => 3000, 'stock' => 80, 'stock_alert' => 15],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
