# NanoBanana Pro API Usage

Based on the documentation at [fal.ai](https://fal.ai/models/fal-ai/nano-banana-pro/api).

## Installation

```bash
npm install --save @fal-ai/client
```

## Authentication

Set the `FAL_KEY` environment variable.

```bash
export FAL_KEY="YOUR_API_KEY"
```

## Usage Example

### Submit a Request (Subscribe)

Uses `fal.subscribe` to submit a request and listen for updates/result.

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/nano-banana-pro", {
  input: {
    prompt: "An action shot of a black lab swimming...",
    num_images: 1, // Default: 1
    aspect_ratio: "1:1", // Options: auto, 1:1, 16:9, 4:3, etc.
    resolution: "1K", // Options: 1K, 2K, 4K
    safety_tolerance: "4", // 1 (strict) to 6 (loose), Default: 4
    output_format: "png" // Options: jpeg, png, webp
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});

console.log(result.data);
console.log(result.requestId);
```

### Submit and Poll (Queue)

Alternatively, use `fal.queue.submit` and `fal.queue.result`.

```javascript
import { fal } from "@fal-ai/client";

// Submit
const { request_id } = await fal.queue.submit("fal-ai/nano-banana-pro", {
  input: { prompt: "..." },
  webhookUrl: "https://optional.webhook.url/for/results", // Optional
});

// Check Status
const status = await fal.queue.status("fal-ai/nano-banana-pro", {
  requestId: request_id,
  logs: true,
});

// Get Result
const result = await fal.queue.result("fal-ai/nano-banana-pro", {
  requestId: request_id
});
```

## Input Parameters

- **prompt** (string): Description of image.
- **num_images** (integer): Number of images (default 1).
- **aspect_ratio** (enum): Aspect ratio (e.g., "1:1", "16:9").
- **resolution** (enum): "1K", "2K", "4K".
- **safety_tolerance** (enum): "1" (strict) to "6" (loose).
- **output_format** (enum): "jpeg", "png", "webp".
- **sync_mode** (boolean): If true, returns data URI.
