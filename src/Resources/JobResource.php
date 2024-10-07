<?php

namespace MotionPanel\MotionPanelLaravel\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'queue' => $this->queue,
            'payload' => $this->payload,
            'attempts' => isset($this->attempts) ? $this->attempts : null,
            'created_at' => isset($this->created_at) ? date('Y-m-d H:i:s', $this->created_at) : null,
            'reserved_at' => isset($this->reserved_at) ? date('Y-m-d H:i:s', $this->reserved_at) : null,
            'available_at' => isset($this->available_at) ? date('Y-m-d H:i:s', $this->available_at) : null,
            'failed_at' => isset($this->failed_at) ? $this->failed_at : null,
        ];
    }
}
