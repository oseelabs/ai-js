export type ModelVariant = "gemini-2.5-pro-preview-03-25" | "gemini-2.0-flash" | "gemini-2.0-flash-lite" | "gemini-1.5-flash" | "gemini-1.5-flash-8b" | "gemini-1.5-pro" | "gemini-embedding-exp" | "imagen-3.0-generate-002";

export enum GenerationType {
    Content = "content",
    ContentStream = "content-stream",
    Images = "images",
    Videos = "videos",
}