import type { 
    ComputeTokensConfig,
    ComputeTokensResponse,
    ContentListUnion,
    CountTokensConfig,
    CountTokensResponse,
    EmbedContentConfig,
    EmbedContentResponse,
    GoogleGenAI as GenAiType,
    GenerateContentConfig,
    GenerateContentResponse,
    GenerateImagesConfig,
    GenerateImagesResponse,
    GenerateVideosConfig,
    GenerateVideosOperation,
    GoogleGenAIOptions,
    Models 
} from "@google/genai";
import type { ModelVariant } from "./types/model.js";
import { GoogleGenAI } from "@google/genai";

/**
 * @namespace Oseelabs
 * @class
 * @category Gemini Genai
 * @categoryDescription Google GenAI API
 * @description The `Init` class is a wrapper around the Google GenAI API, providing methods for generating content, images, videos, and computing tokens.
 * It requires an API key to authenticate requests and can be configured with various options.
 * @property {string} _apiKey - The API key for authenticating requests to the Google GenAI API.
 * @property {GoogleGenAIOptions} _options - Configuration options for the Google GenAI API.
 * @property {GenAiType | null} _genai - An instance of the Google GenAI API client.
 * @property {ModelVariant} _modelVariant - The model variant to use for content generation.
 * 
 */
export default class Init {
    /**
     * Creates an instance of the `Init` class.
     * 
     * @param _apiKey - The API key for authenticating requests to the Google GenAI API.
     * @param _options - Configuration options for the Google GenAI API.
     * @param _genai - An instance of the Google GenAI API client.
     * @param _modelVariant - The model variant to use for content generation.
     * 
     * @return { Init } - An instance of the `Init` class.
     */
    constructor(
        private _apiKey: string, 
        private _options: GoogleGenAIOptions = {},
        private _genai: GenAiType | null = null,
        private _modelVariant: ModelVariant = "gemini-1.5-flash",
    ) {
        this._options.apiKey = this._apiKey;
        this._genai = new GoogleGenAI(this._options);
    }

    /**
     * Gets the API key for the Google GenAI API.
     * @returns {string} The API key.
     */
    get apiKey(): string {
        return this._apiKey;
    }

    /**
     * Sets the API key for the Google GenAI API.
     * @param {string} value - The API key to set.
     * @returns {void}
     */
    set apiKey(value: string) {
        this._apiKey = value;
    }

    /**
     * Gets the model variant for the Google GenAI API.
     * @returns {Models} The models.
     */
    get models(): Models {
        if (!this._apiKey) {
            throw new Error("API key is not set.");
        };
        
        if (!this._genai) {
            this._genai = new GoogleGenAI(this._options);
        };

        return this._genai.models
    }

    /**
     * * Gets the options for the Google GenAI API.
     * @returns {GoogleGenAIOptions} The options.
     */
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
    async generateContent(contents: ContentListUnion, config?: GenerateContentConfig): Promise<GenerateContentResponse> {
        if (!this._apiKey) {
            throw new Error("API key is not set.");
        }
        
        if (!this._genai) {
            this._genai = new GoogleGenAI(this._options);
        }

        const res = await this.models.generateContent({
            model: this._modelVariant,
            contents: contents,
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
     * 
     * This method generates images based on the provided prompt using the Google GenAI API.
     * It requires an API key to authenticate the request.
     * The images are generated fully before being returned.
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
     * 
     * This method generates videos based on the provided prompt using the Google GenAI API.
     * It requires an API key to authenticate the request.
     * The videos are generated fully before being returned.
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


    /**
     * 
     * @param {ContentListUnion} contents - The contents to compute tokens for.
     * @param {ComputeTokensConfig} config - (Optional) configuration for the token computation.
     * @returns A Promise that resolves to the number of tokens computed for the contents.
     * @throws Error if the API key is not set or if the computation fails.
     * 
     * @usage
     * ```ts
     * 
     * const generator = new Init(apiKey, options, modelVariant);
     * const tokenCount = await generator.computeTokens(contents, config);
     * console.log(tokenCount);
     * 
     * ```
     * 
     * This method computes the number of tokens for the provided contents using the Google GenAI API.
     * It requires an API key to authenticate the request.
     * The token count is computed fully before being returned.
     */
    async computeTokens(contents: ContentListUnion, config?: ComputeTokensConfig): Promise<ComputeTokensResponse> {
        if (!this._apiKey) {
            throw new Error("API key is not set.");
        };

        if (!this._genai) {
            this._genai = new GoogleGenAI(this._options);
        };

        const res = this.models.computeTokens({
            model: this._modelVariant,
            contents: contents,
            config: config,
        });

        return res;
    }


    /**
     * 
     * @param {ContentListUnion} contents - The contents to count tokens for.
     * @param {CountTokensConfig} config - (Optional) Configuration options for counting tokens.
     * @returns A promise that resolves to a `CountTokensResponse` containing the token count.
     * @throws Error if the API key is not set.
     * 
     * @usage
     * ```ts
     * 
     * const generator = new Init(apiKey, options, modelVariant);
     * const tokenCount = await generator.countTokens(contents, config);
     * console.log(tokenCount);
     * 
     * ```
     * 
     * This method counts the number of tokens in the provided contents using the Google GenAI API.
     * It requires an API key to authenticate the request.
     * The token count is computed fully before being returned.
     */
    async countTokens(contents: ContentListUnion, config?: CountTokensConfig): Promise<CountTokensResponse> {
        if (!this._apiKey) {
            throw new Error("API key is not set.");
        };

        if (!this._genai) {
            this._genai = new GoogleGenAI(this._options);
        };
        
        const res = await this.models.countTokens({
            model: this._modelVariant,
            contents: contents,
            config: config,
        });

        return res;
    }

    /**
     * 
     * @param {ContentListUnion} contents - The contents to embed.
     * @param {EmbedContentConfig} config - (Optional) configuration for the embedding.
     * @returns A Promise that resolves to an `EmbedContentResponse` containing the embedded content.
     * @throws Error if the API key is not set.
     * 
     * @usage
     * ```ts
     * 
     * const generator = new Init(apiKey, options, modelVariant);
     * const embeddedContent = await generator.embedContent(contents, config);
     * console.log(embeddedContent);
     * 
     * ```
     * 
     * This method embeds the provided contents using the Google GenAI API.
     * It requires an API key to authenticate the request.
     * The embedded content is computed fully before being returned.
     */
    async embedContent(contents: ContentListUnion, config?: EmbedContentConfig): Promise<EmbedContentResponse> {
        if (!this._apiKey) {
            throw new Error("API key is not set.");
        };

        if (!this._genai) {
            this._genai = new GoogleGenAI(this._options);
        };

        const res = await this.models.embedContent({
            model: this._modelVariant,
            contents: contents,
            config: config,
        })

        return res;
    }
}