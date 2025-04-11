import type { 
    Chat,
    ComputeTokensConfig,
    ComputeTokensResponse,
    ContentListUnion,
    CountTokensConfig,
    CountTokensResponse,
    DeleteFileConfig,
    DeleteFileResponse,
    EmbedContentConfig,
    EmbedContentResponse,
    File,
    GoogleGenAI as GenAiType,
    GenerateContentConfig,
    GenerateContentResponse,
    GenerateImagesConfig,
    GenerateImagesResponse,
    GenerateVideosConfig,
    GenerateVideosOperation,
    GetFileConfig,
    GoogleGenAIOptions,
    Models, 
    PartListUnion,
    UploadFileConfig
} from "@google/genai";
import type { ModelVariant } from "./types/model.js";
import { GoogleGenAI } from "@google/genai";

/**
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
    protected chat: Chat | undefined;
    protected _session: { 
        chat: Chat, 
        id: `${string}-${string}-${string}-${string}-${string}` | string 
    } | undefined = undefined;

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
     * @returns {string}
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
     * @returns {Models}
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
     * @returns {GoogleGenAIOptions}
     */
    get options(): GoogleGenAIOptions {
        return this._options;
    }

    
    /**
     * Returns the current chat session.
     * @returns { Chat }
     * 
     * @usage
     * ```ts
     * 
     * const generator = new Init(apiKey, options, modelVariant);
     * const chatSession = generator.chatSession;
     * console.log(chatSession);
     * 
     * ```
     */
    get chatSession(): { chat: Chat, id: `${string}-${string}-${string}-${string}-${string}` | string } {
        if (!this.chat) {
            this.chat = this._genai?.chats.create({
                model: this._modelVariant,
                config: {} as GenerateContentConfig,
            });
        };

        if (!this._session || this._session === undefined) {
            this._session = this.createChatSession();
        }

        return this._session!;
    };


    /**
     * Creates a new chat session for the Google GenAI API.
     * @returns {Chat}
     * 
     * @usage
     * ```ts
     * 
     * const generator = new Init(apiKey, options, modelVariant);
     * const chatSession = generator.chatSession();
     * console.log(chatSession);
     * 
     * ```
     */
    createChatSession() : { chat: Chat, id: `${string}-${string}-${string}-${string}-${string}` | string } {
        this.chat = this._genai?.chats.create({
            model: this._modelVariant,
            config: {} as GenerateContentConfig,
        });

        this._session = {
            chat: this.chat!,
            id: crypto.randomUUID(),
        };

        return this._session!;
    }


    /**
     * @param {ContentListUnion} contents - The prompt to generate content for.
     * @param {GenerateContentConfig} [config] - (Optional) configuration for the generation.
     * @returns {Promise<GenerateContentResponse>}
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
     * @returns {Promise<AsyncGenerator<GenerateContentResponse>>}
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
     * @returns {Promise<GenerateImagesResponse>}
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
     * @returns {Promise<GenerateVideosOperation>}
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
     * @param {ContentListUnion} contents - The contents to compute tokens for.
     * @param {ComputeTokensConfig} config - (Optional) configuration for the token computation.
     * @returns {Promise<ComputeTokensResponse>}
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
     * @returns {Promise<CountTokensResponse>}
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
     * @returns {Promise<EmbedContentResponse>}
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


    /**
     * Sends a chat message to the Google GenAI API and returns the response.
     * @param {PartListUnion} message - The message to send to the chat session.
     * @returns {Promise<GenerateContentResponse>}
     * 
     * @usage
     * ```ts
     * 
     * const generator = new Init(apiKey, options, modelVariant);
     * const response = await generator.chatMessage(message);
     * console.log(response.text);
     * 
     * ```
     */
    async chatMessage(message: PartListUnion) : Promise<GenerateContentResponse> {
        return await this.chatSession.chat.sendMessage({
            message: message,
        });
    }


    /**
     * Sends a chat message to the Google GenAI API and returns a stream of responses.
     * @param {PartListUnion} message - The message to send to the chat session.
     * @returns {Promise<AsyncGenerator<GenerateContentResponse>>}
     * 
     * @usage
     * ```ts
     * 
     * const generator = new Init(apiKey, options, modelVariant);
     * const messageStream = generator.chatMessageStream(message);
     * for await (const response of messageStream) {
     *   console.log(response.text);
     * }
     * 
     * ```
     */
    async chatMessageStream(message: PartListUnion) : Promise<AsyncGenerator<GenerateContentResponse>> {
        return await this.chatSession.chat.sendMessageStream({
            message: message,
        });
    }


    /**
     * Uploads a file to the Google GenAI API.
     * @param { Blob | string } file - The file to upload.
     * @returns { Promise<File> }
     * 
     * @usage
     * ```ts
     * 
     * const generator = new Init(apiKey, options, modelVariant);
     * const file = await generator.uploadFile(fileBlob);
     * console.log(file);
     * 
     * ```
     */
    async uploadFile(file: Blob | string, config?: UploadFileConfig): Promise<File> {
        const newUpload = (await this._genai?.files.upload({
            file: file,
            config: config
        }));

        if (!newUpload) {
            throw Error("Upload failed")
        };

        return newUpload;
    }


    /**
     * Retrieves a file from the Google GenAI API.
     * @param {string} filename - The name of the file to retrieve.
     * @returns { Promise<File> }
     * @throws Error if the file is not found.
     * 
     * @usage
     * ```ts
     * 
     * const generator = new Init(apiKey, options, modelVariant);
     * const file = await generator.getFile(filename);
     * console.log(file);
     * 
     * ```
     */
    async getFile(filename: string, config?: GetFileConfig): Promise<File> {
        const file = await this._genai?.files.get({
            name: filename,
            config: config,
        });

        if (!file) {
            throw Error("File not found")
        };

        return file;
    }

    async deleteFile(filename: string, config?: DeleteFileConfig): Promise<DeleteFileResponse> {
        const response = await this._genai?.files.delete({
            name: filename,
            config: config
        });

        if (!response) {
            throw Error("File not found")
        };

        return response;
    }
}