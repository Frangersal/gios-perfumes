<?php

namespace App\Models\Concerns;

use Carbon\CarbonInterface;

trait GeneratesCreationBasedId
{
    public static function generateCreationBasedId(?CarbonInterface $timestamp = null): int
    {
        $baseTimestamp = $timestamp ?? now();

        do {
            $candidate = (int) ($baseTimestamp->format('ymdHis') . str_pad((string) random_int(0, 999), 3, '0', STR_PAD_LEFT));
        } while (static::query()->whereKey($candidate)->exists());

        return $candidate;
    }
}