import type { ContentListUnion, GoogleGenAI as GenAiType, GenerateContentConfig, GenerateContentResponse, GenerateImagesConfig, GenerateImagesResponse, GenerateVideosConfig, GenerateVideosOperation, GoogleGenAIOptions, Models } from "@google/genai";
import { GoogleGenAI } from "@google/genai";
import type { ModelVariant } from "./types/model.js";

export default class Init {
    constructor(
        private _apiKey: string, 
        private _options: GoogleGenAIOptions = {},
        private _genai: GenAiType | null = null,
        private _modelVariant: ModelVariant = "gemini-1.5-flash",
    ) {
        this._options.apiKey = this._apiKey;
        this._genai = new GoogleGenAI(this._options);
    }

    get apiKey(): string {
        return this._apiKey;
    }

    set apiKey(value: string) {
        this._apiKey = value;
    }

    get models(): Models {
        if (!this._apiKey) {
            throw new Error("API key is not set.");
        };
        
        if (!this._genai) {
            this._genai = new GoogleGenAI(this._options);
        };

        return this._genai.models
    }

    get options(): GoogleGenAIOptions {
        return this._options;
    }


    /**
     * @param {string} prompt - The prompt to generate content for.
     * @param {GenerateContentConfig} [config] - (Optional) configuration for the generation.
     * @returns A Promise that resolves to a GenerateContentResponse object.
     * @throws Error if the API key is not set or if the generation fails.
     * 
     * @usage
     * ```ts
     * const generator = new Init(apiKey, options, modelVariant);
     * const content = await generator.generateContent(prompt, config);
     * console.log(content);
     * 
     * ```
     * 
     * This method generates content based on the provided prompt using the Google GenAI API.
     * It requires an API key to authenticate the request.
     * The content is generated fully before being returned
     */
    async generateContent(prompt: string, config?: GenerateContentConfig): Promise<GenerateContentResponse> {
        if (!this._apiKey) {
            throw new Error("API key is not set.");
        }
        
        if (!this._genai) {
            this._genai = new GoogleGenAI(this._options);
        }

        const res = await this.models.generateContent({
            model: this._modelVariant,
            contents: prompt,
            config: config,
        });

        return res
    }


    /**
     * 
     * @param {ContentListUnion} contents - The contents to generate.
     * @param {GenerateContentConfig} [config] - (Optional) configuration for the generation. 
     * @returns A Promise that resolves to an AsyncGenerator of GenerateContentResponse objects.
     * @throws Error if the API key is not set or if the generation fails.
     * 
     * @usage
     * ```ts
     * const generator = new Init(apiKey, options, modelVariant);
     * const contentStream = generator.generateContentStream(contents, config);
     * 
     * for await (const content of contentStream) {
     *   console.log(content);
     * }
     * ```
     * 
     * This method generates content based on the provided contents using the Google GenAI API.
     * It requires an API key to authenticate the request.
     * The content is generated in a streaming manner, allowing for real-time processing of the generated content.
     * The contents are generated as they are produced, allowing for real-time processing of the generated content.
     */
    async generateContentStream(contents: ContentListUnion, config?: GenerateContentConfig): Promise<AsyncGenerator<GenerateContentResponse>> {
        if (!this._apiKey) {
            throw new Error("API key is not set.");
        };
        
        if (!this._genai) {
            this._genai = new GoogleGenAI(this._options);
        };

        const res = await this.models.generateContentStream({
            model: this._modelVariant,
            contents: contents,
            config: config,
        });

        return res;
    }


    /**
     * 
     * @param {string} prompt - The prompt to generate images for.
     * @param {GenerateImagesConfig} config - (Optional) configuration for the generation.
     * @returns A Promise that resolves to a GenerateImagesResponse object.
     * @throws Error if the API key is not set or if the generation fails.
     * 
     * @usage
     * ```ts
     * 
     * const generator = new Init(apiKey, options, modelVariant);
     * const images = await generator.generateImages(prompt, config);
     * console.log(images);
     * 
     * ```
     */
    async generateImages(prompt: string, config?: GenerateImagesConfig): Promise<GenerateImagesResponse> {
        if (!this._apiKey) {
            throw new Error("API key is not set.");
        };

        if (!this._genai) {
            this._genai = new GoogleGenAI(this._options);
        };

        const res = await this.models.generateImages({
            model: this._modelVariant,
            prompt: prompt,
            config: config,
        });

        return res;
    }


    /**
     * Generates videos based on the provided prompt and configuration.
     *
     * @param prompt - The text prompt describing the desired video content.
     * @param config - (Optional) Configuration options for video generation.
     * @returns A promise that resolves to a `GenerateVideosOperation` containing the result of the video generation process.
     * @throws Error - If the API key is not set.
     * 
     * @usage
     * ```ts
     * 
     * const generator = new Init(apiKey, options, modelVariant);
     * const videos = await generator.generateVideos(prompt, config);
     * console.log(videos);
     * 
     * ```
     */
    async generateVideos(prompt: string, config?: GenerateVideosConfig): Promise<GenerateVideosOperation> {
        if (!this._apiKey) {
            throw new Error("API key is not set.");
        };

        if (!this._genai) {
            this._genai = new GoogleGenAI(this._options);
        };

        const res = await this.models.generateVideos({
            model: this._modelVariant,
            prompt: prompt,
            config: config,
        });

        return res;
    }
}