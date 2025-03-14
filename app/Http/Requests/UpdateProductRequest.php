<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'unit' => ['nullable', 'string', 'max:20'],
            'buy_price' => ['required', 'integer', 'max:9999999999'],
            'sell_price' => ['required', 'integer', 'max:9999999999'],
            'stock' => ['required', 'numeric', 'max:9999999'],
            'stock_alert' => ['required', 'integer', 'max:9999999'],
            'expired_date' => ['nullable', 'date'],
            'whole_price' => ['nullable', 'integer', 'max:9999999999'],
            'whole_stock' => ['nullable', 'numeric', 'max:9999999'],
        ];
    }
}
