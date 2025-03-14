<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyRequest extends FormRequest
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
            "name"=> "nullable|string|max:255",
            "phones"=> "nullable|string|max:255",
            "email"=> "nullable|string|max:255",
            "address"=> "nullable|string|max:255",
            "city"=> "nullable|string|max:255",
            "registration_no"=> "nullable|string|max:255",
        ];
    }
}
