/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

type UtilRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export interface AddUploadPartRequest {
  /**
   * The chunk of bytes for this Part.
   * @format binary
   */
  data: File;
}

/** Represents an individual Admin API key in an org. */
export interface AdminApiKey {
  /**
   * The object type, which is always `organization.admin_api_key`
   * @example "organization.admin_api_key"
   */
  object: string;
  /**
   * The identifier, which can be referenced in API endpoints
   * @example "key_abc"
   */
  id: string;
  /**
   * The name of the API key
   * @example "Administration Key"
   */
  name: string;
  /**
   * The redacted value of the API key
   * @example "sk-admin...def"
   */
  redacted_value: string;
  /**
   * The value of the API key. Only shown on create.
   * @example "sk-admin-1234abcd"
   */
  value?: string;
  /**
   * The Unix timestamp (in seconds) of when the API key was created
   * @format int64
   * @example 1711471533
   */
  created_at: number;
  /**
   * The Unix timestamp (in seconds) of when the API key was last used
   * @format int64
   * @example 1711471534
   */
  last_used_at: number | null;
  owner: {
    /**
     * Always `user`
     * @example "user"
     */
    type?: string;
    /**
     * The object type, which is always organization.user
     * @example "organization.user"
     */
    object?: string;
    /**
     * The identifier, which can be referenced in API endpoints
     * @example "sa_456"
     */
    id?: string;
    /**
     * The name of the user
     * @example "My Service Account"
     */
    name?: string;
    /**
     * The Unix timestamp (in seconds) of when the user was created
     * @format int64
     * @example 1711471533
     */
    created_at?: number;
    /**
     * Always `owner`
     * @example "owner"
     */
    role?: string;
  };
}

export interface ApiKeyList {
  /** @example "list" */
  object?: string;
  data?: AdminApiKey[];
  /** @example false */
  has_more?: boolean;
  /** @example "key_abc" */
  first_id?: string;
  /** @example "key_xyz" */
  last_id?: string;
}

/**
 * Assistant
 * Represents an `assistant` that can call the model and use tools.
 */
export interface AssistantObject {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `assistant`. */
  object: "assistant";
  /** The Unix timestamp (in seconds) for when the assistant was created. */
  created_at: number;
  /**
   * The name of the assistant. The maximum length is 256 characters.
   * @maxLength 256
   */
  name: string | null;
  /**
   * The description of the assistant. The maximum length is 512 characters.
   * @maxLength 512
   */
  description: string | null;
  /** ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models) for descriptions of them. */
  model: string;
  /**
   * The system instructions that the assistant uses. The maximum length is 256,000 characters.
   * @maxLength 256000
   */
  instructions: string | null;
  /**
   * A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.
   * @maxItems 128
   * @default []
   */
  tools: (AssistantToolsCode | AssistantToolsFileSearch | AssistantToolsFunction)[];
  /** A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs. */
  tool_resources?: {
    code_interpreter?: {
      /**
       * A list of [file](/docs/api-reference/files) IDs made available to the `code_interpreter`` tool. There can be a maximum of 20 files associated with the tool.
       * @maxItems 20
       * @default []
       */
      file_ids?: string[];
    };
    file_search?: {
      /**
       * The ID of the [vector store](/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.
       * @maxItems 1
       */
      vector_store_ids?: string[];
    };
  } | null;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Metadata;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * @min 0
   * @max 2
   * @default 1
   * @example 1
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   * @min 0
   * @max 1
   * @default 1
   * @example 1
   */
  top_p?: number | null;
  /**
   * Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.
   *
   * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).
   *
   * Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.
   *
   * **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.
   */
  response_format?: AssistantsApiResponseFormatOption | null;
}

/**
 * Represents an event emitted when streaming a Run.
 *
 * Each event in a server-sent events stream has an `event` and `data` property:
 *
 * ```
 * event: thread.created
 * data: {"id": "thread_123", "object": "thread", ...}
 * ```
 *
 * We emit events whenever a new object is created, transitions to a new state, or is being
 * streamed in parts (deltas). For example, we emit `thread.run.created` when a new run
 * is created, `thread.run.completed` when a run completes, and so on. When an Assistant chooses
 * to create a message during a run, we emit a `thread.message.created event`, a
 * `thread.message.in_progress` event, many `thread.message.delta` events, and finally a
 * `thread.message.completed` event.
 *
 * We may add additional events over time, so we recommend handling unknown events gracefully
 * in your code. See the [Assistants API quickstart](/docs/assistants/overview) to learn how to
 * integrate the Assistants API with streaming.
 */
export type AssistantStreamEvent =
  | ThreadStreamEvent
  | RunStreamEvent
  | RunStepStreamEvent
  | MessageStreamEvent
  | ErrorEvent
  | DoneEvent;

export type AssistantSupportedModels =
  | "gpt-4.1"
  | "gpt-4.1-mini"
  | "gpt-4.1-nano"
  | "gpt-4.1-2025-04-14"
  | "gpt-4.1-mini-2025-04-14"
  | "gpt-4.1-nano-2025-04-14"
  | "o3-mini"
  | "o3-mini-2025-01-31"
  | "o1"
  | "o1-2024-12-17"
  | "gpt-4o"
  | "gpt-4o-2024-11-20"
  | "gpt-4o-2024-08-06"
  | "gpt-4o-2024-05-13"
  | "gpt-4o-mini"
  | "gpt-4o-mini-2024-07-18"
  | "gpt-4.5-preview"
  | "gpt-4.5-preview-2025-02-27"
  | "gpt-4-turbo"
  | "gpt-4-turbo-2024-04-09"
  | "gpt-4-0125-preview"
  | "gpt-4-turbo-preview"
  | "gpt-4-1106-preview"
  | "gpt-4-vision-preview"
  | "gpt-4"
  | "gpt-4-0314"
  | "gpt-4-0613"
  | "gpt-4-32k"
  | "gpt-4-32k-0314"
  | "gpt-4-32k-0613"
  | "gpt-3.5-turbo"
  | "gpt-3.5-turbo-16k"
  | "gpt-3.5-turbo-0613"
  | "gpt-3.5-turbo-1106"
  | "gpt-3.5-turbo-0125"
  | "gpt-3.5-turbo-16k-0613";

/** Code interpreter tool */
export interface AssistantToolsCode {
  /** The type of tool being defined: `code_interpreter` */
  type: "code_interpreter";
}

/** FileSearch tool */
export interface AssistantToolsFileSearch {
  /** The type of tool being defined: `file_search` */
  type: "file_search";
  /** Overrides for the file search tool. */
  file_search?: {
    /**
     * The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.
     *
     * Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.
     * @min 1
     * @max 50
     */
    max_num_results?: number;
    /**
     * The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.
     *
     * See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.
     */
    ranking_options?: FileSearchRankingOptions;
  };
}

/** FileSearch tool */
export interface AssistantToolsFileSearchTypeOnly {
  /** The type of tool being defined: `file_search` */
  type: "file_search";
}

/** Function tool */
export interface AssistantToolsFunction {
  /** The type of tool being defined: `function` */
  type: "function";
  function: FunctionObject;
}

/**
 * Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.
 *
 * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).
 *
 * Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.
 *
 * **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.
 */
export type AssistantsApiResponseFormatOption =
  | "auto"
  | ResponseFormatText
  | ResponseFormatJsonObject
  | ResponseFormatJsonSchema;

/**
 * Controls which (if any) tool is called by the model.
 * `none` means the model will not call any tools and instead generates a message.
 * `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
 * `required` means the model must call one or more tools before responding to the user.
 * Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.
 */
export type AssistantsApiToolChoiceOption = "none" | "auto" | "required" | AssistantsNamedToolChoice;

/** Specifies a tool the model should use. Use to force the model to call a specific tool. */
export interface AssistantsNamedToolChoice {
  /** The type of the tool. If type is `function`, the function name must be set */
  type: "function" | "code_interpreter" | "file_search";
  function?: {
    /** The name of the function to call. */
    name: string;
  };
}

/**
 * The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, or `vtt`. For `gpt-4o-transcribe` and `gpt-4o-mini-transcribe`, the only supported format is `json`.
 * @default "json"
 */
export type AudioResponseFormat = "json" | "text" | "srt" | "verbose_json" | "vtt";

/** A log of a user action or configuration change within this organization. */
export interface AuditLog {
  /** The ID of this log. */
  id: string;
  /** The event type. */
  type: AuditLogEventType;
  /** The Unix timestamp (in seconds) of the event. */
  effective_at: number;
  /** The project that the action was scoped to. Absent for actions not scoped to projects. */
  project?: {
    /** The project ID. */
    id?: string;
    /** The project title. */
    name?: string;
  };
  /** The actor who performed the audit logged action. */
  actor: AuditLogActor;
  /** The details for events with this `type`. */
  "api_key.created"?: {
    /** The tracking ID of the API key. */
    id?: string;
    /** The payload used to create the API key. */
    data?: {
      /** A list of scopes allowed for the API key, e.g. `["api.model.request"]` */
      scopes?: string[];
    };
  };
  /** The details for events with this `type`. */
  "api_key.updated"?: {
    /** The tracking ID of the API key. */
    id?: string;
    /** The payload used to update the API key. */
    changes_requested?: {
      /** A list of scopes allowed for the API key, e.g. `["api.model.request"]` */
      scopes?: string[];
    };
  };
  /** The details for events with this `type`. */
  "api_key.deleted"?: {
    /** The tracking ID of the API key. */
    id?: string;
  };
  /** The project and fine-tuned model checkpoint that the checkpoint permission was created for. */
  "checkpoint_permission.created"?: {
    /** The ID of the checkpoint permission. */
    id?: string;
    /** The payload used to create the checkpoint permission. */
    data?: {
      /** The ID of the project that the checkpoint permission was created for. */
      project_id?: string;
      /** The ID of the fine-tuned model checkpoint. */
      fine_tuned_model_checkpoint?: string;
    };
  };
  /** The details for events with this `type`. */
  "checkpoint_permission.deleted"?: {
    /** The ID of the checkpoint permission. */
    id?: string;
  };
  /** The details for events with this `type`. */
  "invite.sent"?: {
    /** The ID of the invite. */
    id?: string;
    /** The payload used to create the invite. */
    data?: {
      /** The email invited to the organization. */
      email?: string;
      /** The role the email was invited to be. Is either `owner` or `member`. */
      role?: string;
    };
  };
  /** The details for events with this `type`. */
  "invite.accepted"?: {
    /** The ID of the invite. */
    id?: string;
  };
  /** The details for events with this `type`. */
  "invite.deleted"?: {
    /** The ID of the invite. */
    id?: string;
  };
  /** The details for events with this `type`. */
  "login.failed"?: {
    /** The error code of the failure. */
    error_code?: string;
    /** The error message of the failure. */
    error_message?: string;
  };
  /** The details for events with this `type`. */
  "logout.failed"?: {
    /** The error code of the failure. */
    error_code?: string;
    /** The error message of the failure. */
    error_message?: string;
  };
  /** The details for events with this `type`. */
  "organization.updated"?: {
    /** The organization ID. */
    id?: string;
    /** The payload used to update the organization settings. */
    changes_requested?: {
      /** The organization title. */
      title?: string;
      /** The organization description. */
      description?: string;
      /** The organization name. */
      name?: string;
      /** Visibility of the threads page which shows messages created with the Assistants API and Playground. One of `ANY_ROLE`, `OWNERS`, or `NONE`. */
      threads_ui_visibility?: string;
      /** Visibility of the usage dashboard which shows activity and costs for your organization. One of `ANY_ROLE` or `OWNERS`. */
      usage_dashboard_visibility?: string;
      /** How your organization logs data from supported API calls. One of `disabled`, `enabled_per_call`, `enabled_for_all_projects`, or `enabled_for_selected_projects` */
      api_call_logging?: string;
      /** The list of project ids if api_call_logging is set to `enabled_for_selected_projects` */
      api_call_logging_project_ids?: string;
    };
  };
  /** The details for events with this `type`. */
  "project.created"?: {
    /** The project ID. */
    id?: string;
    /** The payload used to create the project. */
    data?: {
      /** The project name. */
      name?: string;
      /** The title of the project as seen on the dashboard. */
      title?: string;
    };
  };
  /** The details for events with this `type`. */
  "project.updated"?: {
    /** The project ID. */
    id?: string;
    /** The payload used to update the project. */
    changes_requested?: {
      /** The title of the project as seen on the dashboard. */
      title?: string;
    };
  };
  /** The details for events with this `type`. */
  "project.archived"?: {
    /** The project ID. */
    id?: string;
  };
  /** The details for events with this `type`. */
  "rate_limit.updated"?: {
    /** The rate limit ID */
    id?: string;
    /** The payload used to update the rate limits. */
    changes_requested?: {
      /** The maximum requests per minute. */
      max_requests_per_1_minute?: number;
      /** The maximum tokens per minute. */
      max_tokens_per_1_minute?: number;
      /** The maximum images per minute. Only relevant for certain models. */
      max_images_per_1_minute?: number;
      /** The maximum audio megabytes per minute. Only relevant for certain models. */
      max_audio_megabytes_per_1_minute?: number;
      /** The maximum requests per day. Only relevant for certain models. */
      max_requests_per_1_day?: number;
      /** The maximum batch input tokens per day. Only relevant for certain models. */
      batch_1_day_max_input_tokens?: number;
    };
  };
  /** The details for events with this `type`. */
  "rate_limit.deleted"?: {
    /** The rate limit ID */
    id?: string;
  };
  /** The details for events with this `type`. */
  "service_account.created"?: {
    /** The service account ID. */
    id?: string;
    /** The payload used to create the service account. */
    data?: {
      /** The role of the service account. Is either `owner` or `member`. */
      role?: string;
    };
  };
  /** The details for events with this `type`. */
  "service_account.updated"?: {
    /** The service account ID. */
    id?: string;
    /** The payload used to updated the service account. */
    changes_requested?: {
      /** The role of the service account. Is either `owner` or `member`. */
      role?: string;
    };
  };
  /** The details for events with this `type`. */
  "service_account.deleted"?: {
    /** The service account ID. */
    id?: string;
  };
  /** The details for events with this `type`. */
  "user.added"?: {
    /** The user ID. */
    id?: string;
    /** The payload used to add the user to the project. */
    data?: {
      /** The role of the user. Is either `owner` or `member`. */
      role?: string;
    };
  };
  /** The details for events with this `type`. */
  "user.updated"?: {
    /** The project ID. */
    id?: string;
    /** The payload used to update the user. */
    changes_requested?: {
      /** The role of the user. Is either `owner` or `member`. */
      role?: string;
    };
  };
  /** The details for events with this `type`. */
  "user.deleted"?: {
    /** The user ID. */
    id?: string;
  };
  /** The details for events with this `type`. */
  "certificate.created"?: {
    /** The certificate ID. */
    id?: string;
    /** The name of the certificate. */
    name?: string;
  };
  /** The details for events with this `type`. */
  "certificate.updated"?: {
    /** The certificate ID. */
    id?: string;
    /** The name of the certificate. */
    name?: string;
  };
  /** The details for events with this `type`. */
  "certificate.deleted"?: {
    /** The certificate ID. */
    id?: string;
    /** The name of the certificate. */
    name?: string;
    /** The certificate content in PEM format. */
    certificate?: string;
  };
  /** The details for events with this `type`. */
  "certificates.activated"?: {
    certificates?: {
      /** The certificate ID. */
      id?: string;
      /** The name of the certificate. */
      name?: string;
    }[];
  };
  /** The details for events with this `type`. */
  "certificates.deactivated"?: {
    certificates?: {
      /** The certificate ID. */
      id?: string;
      /** The name of the certificate. */
      name?: string;
    }[];
  };
}

/** The actor who performed the audit logged action. */
export interface AuditLogActor {
  /** The type of actor. Is either `session` or `api_key`. */
  type?: "session" | "api_key";
  /** The session in which the audit logged action was performed. */
  session?: AuditLogActorSession;
  /** The API Key used to perform the audit logged action. */
  api_key?: AuditLogActorApiKey;
}

/** The API Key used to perform the audit logged action. */
export interface AuditLogActorApiKey {
  /** The tracking id of the API key. */
  id?: string;
  /** The type of API key. Can be either `user` or `service_account`. */
  type?: "user" | "service_account";
  /** The user who performed the audit logged action. */
  user?: AuditLogActorUser;
  /** The service account that performed the audit logged action. */
  service_account?: AuditLogActorServiceAccount;
}

/** The service account that performed the audit logged action. */
export interface AuditLogActorServiceAccount {
  /** The service account id. */
  id?: string;
}

/** The session in which the audit logged action was performed. */
export interface AuditLogActorSession {
  /** The user who performed the audit logged action. */
  user?: AuditLogActorUser;
  /** The IP address from which the action was performed. */
  ip_address?: string;
}

/** The user who performed the audit logged action. */
export interface AuditLogActorUser {
  /** The user id. */
  id?: string;
  /** The user email. */
  email?: string;
}

/** The event type. */
export type AuditLogEventType =
  | "api_key.created"
  | "api_key.updated"
  | "api_key.deleted"
  | "checkpoint_permission.created"
  | "checkpoint_permission.deleted"
  | "invite.sent"
  | "invite.accepted"
  | "invite.deleted"
  | "login.succeeded"
  | "login.failed"
  | "logout.succeeded"
  | "logout.failed"
  | "organization.updated"
  | "project.created"
  | "project.updated"
  | "project.archived"
  | "service_account.created"
  | "service_account.updated"
  | "service_account.deleted"
  | "rate_limit.updated"
  | "rate_limit.deleted"
  | "user.added"
  | "user.updated"
  | "user.deleted";

/**
 * Auto Chunking Strategy
 * The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.
 */
export interface AutoChunkingStrategyRequestParam {
  /** Always `auto`. */
  type: "auto";
}

export interface Batch {
  id: string;
  /** The object type, which is always `batch`. */
  object: "batch";
  /** The OpenAI API endpoint used by the batch. */
  endpoint: string;
  errors?: {
    /** The object type, which is always `list`. */
    object?: string;
    data?: {
      /** An error code identifying the error type. */
      code?: string;
      /** A human-readable message providing more details about the error. */
      message?: string;
      /** The name of the parameter that caused the error, if applicable. */
      param?: string | null;
      /** The line number of the input file where the error occurred, if applicable. */
      line?: number | null;
    }[];
  };
  /** The ID of the input file for the batch. */
  input_file_id: string;
  /** The time frame within which the batch should be processed. */
  completion_window: string;
  /** The current status of the batch. */
  status: "validating" | "failed" | "in_progress" | "finalizing" | "completed" | "expired" | "cancelling" | "cancelled";
  /** The ID of the file containing the outputs of successfully executed requests. */
  output_file_id?: string;
  /** The ID of the file containing the outputs of requests with errors. */
  error_file_id?: string;
  /** The Unix timestamp (in seconds) for when the batch was created. */
  created_at: number;
  /** The Unix timestamp (in seconds) for when the batch started processing. */
  in_progress_at?: number;
  /** The Unix timestamp (in seconds) for when the batch will expire. */
  expires_at?: number;
  /** The Unix timestamp (in seconds) for when the batch started finalizing. */
  finalizing_at?: number;
  /** The Unix timestamp (in seconds) for when the batch was completed. */
  completed_at?: number;
  /** The Unix timestamp (in seconds) for when the batch failed. */
  failed_at?: number;
  /** The Unix timestamp (in seconds) for when the batch expired. */
  expired_at?: number;
  /** The Unix timestamp (in seconds) for when the batch started cancelling. */
  cancelling_at?: number;
  /** The Unix timestamp (in seconds) for when the batch was cancelled. */
  cancelled_at?: number;
  /** The request counts for different statuses within the batch. */
  request_counts?: {
    /** Total number of requests in the batch. */
    total: number;
    /** Number of requests that have been completed successfully. */
    completed: number;
    /** Number of requests that have failed. */
    failed: number;
  };
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
}

/** The per-line object of the batch input file */
export interface BatchRequestInput {
  /** A developer-provided per-request id that will be used to match outputs to inputs. Must be unique for each request in a batch. */
  custom_id?: string;
  /** The HTTP method to be used for the request. Currently only `POST` is supported. */
  method?: "POST";
  /** The OpenAI API relative URL to be used for the request. Currently `/v1/chat/completions`, `/v1/embeddings`, and `/v1/completions` are supported. */
  url?: string;
}

/** The per-line object of the batch output and error files */
export interface BatchRequestOutput {
  id?: string;
  /** A developer-provided per-request id that will be used to match outputs to inputs. */
  custom_id?: string;
  response?: {
    /** The HTTP status code of the response */
    status_code?: number;
    /** An unique identifier for the OpenAI API request. Please include this request ID when contacting support. */
    request_id?: string;
    /** The JSON body of the response */
    body?: object;
  } | null;
  /** For requests that failed with a non-HTTP error, this will contain more information on the cause of the failure. */
  error?: {
    /** A machine-readable error code. */
    code?: string;
    /** A human-readable error message. */
    message?: string;
  } | null;
}

/** Represents an individual `certificate` uploaded to the organization. */
export interface Certificate {
  /**
   * The object type.
   *
   * - If creating, updating, or getting a specific certificate, the object type is `certificate`.
   * - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
   * - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.
   */
  object: "certificate" | "organization.certificate" | "organization.project.certificate";
  /** The identifier, which can be referenced in API endpoints */
  id: string;
  /** The name of the certificate. */
  name: string;
  /** The Unix timestamp (in seconds) of when the certificate was uploaded. */
  created_at: number;
  certificate_details: {
    /** The Unix timestamp (in seconds) of when the certificate becomes valid. */
    valid_at?: number;
    /** The Unix timestamp (in seconds) of when the certificate expires. */
    expires_at?: number;
    /** The content of the certificate in PEM format. */
    content?: string;
  };
  /** Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate. */
  active?: boolean;
}

export interface ChatCompletionDeleted {
  /** The type of object being deleted. */
  object: "chat.completion.deleted";
  /** The ID of the chat completion that was deleted. */
  id: string;
  /** Whether the chat completion was deleted. */
  deleted: boolean;
}

/** Specifying a particular function via `{"name": "my_function"}` forces the model to call that function. */
export interface ChatCompletionFunctionCallOption {
  /** The name of the function to call. */
  name: string;
}

/** @deprecated */
export interface ChatCompletionFunctions {
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64. */
  name: string;
  /**
   * The parameters the functions accepts, described as a JSON Schema object. See the [guide](/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.
   *
   * Omitting `parameters` defines a function with an empty parameter list.
   */
  parameters?: FunctionParameters;
}

/**
 * ChatCompletionList
 * An object representing a list of Chat Completions.
 */
export interface ChatCompletionList {
  /**
   * The type of this object. It is always set to "list".
   * @default "list"
   */
  object: "list";
  /** An array of chat completion objects. */
  data: CreateChatCompletionResponse[];
  /** The identifier of the first chat completion in the data array. */
  first_id: string;
  /** The identifier of the last chat completion in the data array. */
  last_id: string;
  /** Indicates whether there are more Chat Completions available. */
  has_more: boolean;
}

/**
 * ChatCompletionMessageList
 * An object representing a list of chat completion messages.
 */
export interface ChatCompletionMessageList {
  /**
   * The type of this object. It is always set to "list".
   * @default "list"
   */
  object: "list";
  /** An array of chat completion message objects. */
  data: (ChatCompletionResponseMessage & {
    /** The identifier of the chat message. */
    id: string;
  })[];
  /** The identifier of the first chat message in the data array. */
  first_id: string;
  /** The identifier of the last chat message in the data array. */
  last_id: string;
  /** Indicates whether there are more chat messages available. */
  has_more: boolean;
}

export interface ChatCompletionMessageToolCall {
  /** The ID of the tool call. */
  id: string;
  /** The type of the tool. Currently, only `function` is supported. */
  type: "function";
  /** The function that the model called. */
  function: {
    /** The name of the function to call. */
    name: string;
    /** The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function. */
    arguments: string;
  };
}

export interface ChatCompletionMessageToolCallChunk {
  index: number;
  /** The ID of the tool call. */
  id?: string;
  /** The type of the tool. Currently, only `function` is supported. */
  type?: "function";
  function?: {
    /** The name of the function to call. */
    name?: string;
    /** The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function. */
    arguments?: string;
  };
}

/** The tool calls generated by the model, such as function calls. */
export type ChatCompletionMessageToolCalls = ChatCompletionMessageToolCall[];

/**
 * Output types that you would like the model to generate for this request.
 * Most models are capable of generating text, which is the default:
 *
 * `["text"]`
 *
 * The `gpt-4o-audio-preview` model can also be used to [generate audio](/docs/guides/audio). To
 * request that this model generate both text and audio responses, you can
 * use:
 *
 * `["text", "audio"]`
 */
export type ChatCompletionModalities = ("text" | "audio")[] | null;

/** Specifies a tool the model should use. Use to force the model to call a specific function. */
export interface ChatCompletionNamedToolChoice {
  /** The type of the tool. Currently, only `function` is supported. */
  type: "function";
  function: {
    /** The name of the function to call. */
    name: string;
  };
}

/**
 * Assistant message
 * Messages sent by the model in response to user messages.
 */
export interface ChatCompletionRequestAssistantMessage {
  /** The contents of the assistant message. Required unless `tool_calls` or `function_call` is specified. */
  content?: string | ChatCompletionRequestAssistantMessageContentPart[] | null;
  /** The refusal message by the assistant. */
  refusal?: string | null;
  /** The role of the messages author, in this case `assistant`. */
  role: "assistant";
  /** An optional name for the participant. Provides the model information to differentiate between participants of the same role. */
  name?: string;
  /**
   * Data about a previous audio response from the model.
   * [Learn more](/docs/guides/audio).
   */
  audio?: {
    /** Unique identifier for a previous audio response from the model. */
    id: string;
  } | null;
  /** The tool calls generated by the model, such as function calls. */
  tool_calls?: ChatCompletionMessageToolCalls;
  /**
   * Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.
   * @deprecated
   */
  function_call?: {
    /** The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function. */
    arguments: string;
    /** The name of the function to call. */
    name: string;
  } | null;
}

export type ChatCompletionRequestAssistantMessageContentPart =
  | ChatCompletionRequestMessageContentPartText
  | ChatCompletionRequestMessageContentPartRefusal;

/**
 * Developer message
 * Developer-provided instructions that the model should follow, regardless of
 * messages sent by the user. With o1 models and newer, `developer` messages
 * replace the previous `system` messages.
 */
export interface ChatCompletionRequestDeveloperMessage {
  /** The contents of the developer message. */
  content: string | ChatCompletionRequestMessageContentPartText[];
  /** The role of the messages author, in this case `developer`. */
  role: "developer";
  /** An optional name for the participant. Provides the model information to differentiate between participants of the same role. */
  name?: string;
}

/**
 * Function message
 * @deprecated
 */
export interface ChatCompletionRequestFunctionMessage {
  /** The role of the messages author, in this case `function`. */
  role: "function";
  /** The contents of the function message. */
  content: string | null;
  /** The name of the function to call. */
  name: string;
}

export type ChatCompletionRequestMessage =
  | ChatCompletionRequestDeveloperMessage
  | ChatCompletionRequestSystemMessage
  | ChatCompletionRequestUserMessage
  | ChatCompletionRequestAssistantMessage
  | ChatCompletionRequestToolMessage
  | ChatCompletionRequestFunctionMessage;

/**
 * Audio content part
 * Learn about [audio inputs](/docs/guides/audio).
 */
export interface ChatCompletionRequestMessageContentPartAudio {
  /** The type of the content part. Always `input_audio`. */
  type: "input_audio";
  input_audio: {
    /** Base64 encoded audio data. */
    data: string;
    /** The format of the encoded audio data. Currently supports "wav" and "mp3". */
    format: "wav" | "mp3";
  };
}

/**
 * File content part
 * Learn about [file inputs](/docs/guides/text) for text generation.
 */
export interface ChatCompletionRequestMessageContentPartFile {
  /** The type of the content part. Always `file`. */
  type: "file";
  file: {
    /**
     * The name of the file, used when passing the file to the model as a
     * string.
     */
    filename?: string;
    /**
     * The base64 encoded file data, used when passing the file to the model
     * as a string.
     */
    file_data?: string;
    /** The ID of an uploaded file to use as input. */
    file_id?: string;
  };
}

/**
 * Image content part
 * Learn about [image inputs](/docs/guides/vision).
 */
export interface ChatCompletionRequestMessageContentPartImage {
  /** The type of the content part. */
  type: "image_url";
  image_url: {
    /**
     * Either a URL of the image or the base64 encoded image data.
     * @format uri
     */
    url: string;
    /**
     * Specifies the detail level of the image. Learn more in the [Vision guide](/docs/guides/vision#low-or-high-fidelity-image-understanding).
     * @default "auto"
     */
    detail?: "auto" | "low" | "high";
  };
}

/** Refusal content part */
export interface ChatCompletionRequestMessageContentPartRefusal {
  /** The type of the content part. */
  type: "refusal";
  /** The refusal message generated by the model. */
  refusal: string;
}

/**
 * Text content part
 * Learn about [text inputs](/docs/guides/text-generation).
 */
export interface ChatCompletionRequestMessageContentPartText {
  /** The type of the content part. */
  type: "text";
  /** The text content. */
  text: string;
}

/**
 * System message
 * Developer-provided instructions that the model should follow, regardless of
 * messages sent by the user. With o1 models and newer, use `developer` messages
 * for this purpose instead.
 */
export interface ChatCompletionRequestSystemMessage {
  /** The contents of the system message. */
  content: string | ChatCompletionRequestSystemMessageContentPart[];
  /** The role of the messages author, in this case `system`. */
  role: "system";
  /** An optional name for the participant. Provides the model information to differentiate between participants of the same role. */
  name?: string;
}

export type ChatCompletionRequestSystemMessageContentPart = ChatCompletionRequestMessageContentPartText;

/** Tool message */
export interface ChatCompletionRequestToolMessage {
  /** The role of the messages author, in this case `tool`. */
  role: "tool";
  /** The contents of the tool message. */
  content: string | ChatCompletionRequestToolMessageContentPart[];
  /** Tool call that this message is responding to. */
  tool_call_id: string;
}

export type ChatCompletionRequestToolMessageContentPart = ChatCompletionRequestMessageContentPartText;

/**
 * User message
 * Messages sent by an end user, containing prompts or additional context
 * information.
 */
export interface ChatCompletionRequestUserMessage {
  /** The contents of the user message. */
  content: string | ChatCompletionRequestUserMessageContentPart[];
  /** The role of the messages author, in this case `user`. */
  role: "user";
  /** An optional name for the participant. Provides the model information to differentiate between participants of the same role. */
  name?: string;
}

export type ChatCompletionRequestUserMessageContentPart =
  | ChatCompletionRequestMessageContentPartText
  | ChatCompletionRequestMessageContentPartImage
  | ChatCompletionRequestMessageContentPartAudio
  | ChatCompletionRequestMessageContentPartFile;

/** A chat completion message generated by the model. */
export interface ChatCompletionResponseMessage {
  /** The contents of the message. */
  content: string | null;
  /** The refusal message generated by the model. */
  refusal: string | null;
  /** The tool calls generated by the model, such as function calls. */
  tool_calls?: ChatCompletionMessageToolCalls;
  /**
   * Annotations for the message, when applicable, as when using the
   * [web search tool](/docs/guides/tools-web-search?api-mode=chat).
   */
  annotations?: {
    /** The type of the URL citation. Always `url_citation`. */
    type: "url_citation";
    /** A URL citation when using web search. */
    url_citation: {
      /** The index of the last character of the URL citation in the message. */
      end_index: number;
      /** The index of the first character of the URL citation in the message. */
      start_index: number;
      /** The URL of the web resource. */
      url: string;
      /** The title of the web resource. */
      title: string;
    };
  }[];
  /** The role of the author of this message. */
  role: "assistant";
  /**
   * Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.
   * @deprecated
   */
  function_call?: {
    /** The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function. */
    arguments: string;
    /** The name of the function to call. */
    name: string;
  };
  /**
   * If the audio output modality is requested, this object contains data
   * about the audio response from the model. [Learn more](/docs/guides/audio).
   */
  audio?: {
    /** Unique identifier for this audio response. */
    id: string;
    /**
     * The Unix timestamp (in seconds) for when this audio response will
     * no longer be accessible on the server for use in multi-turn
     * conversations.
     */
    expires_at: number;
    /**
     * Base64 encoded audio bytes generated by the model, in the format
     * specified in the request.
     */
    data: string;
    /** Transcript of the audio generated by the model. */
    transcript: string;
  } | null;
}

/** The role of the author of a message */
export type ChatCompletionRole = "developer" | "system" | "user" | "assistant" | "tool" | "function";

/**
 * Options for streaming response. Only set this when you set `stream: true`.
 * @default null
 */
export type ChatCompletionStreamOptions = {
  /**
   * If set, an additional chunk will be streamed before the `data: [DONE]`
   * message. The `usage` field on this chunk shows the token usage statistics
   * for the entire request, and the `choices` field will always be an empty
   * array.
   *
   * All other chunks will also include a `usage` field, but with a null
   * value. **NOTE:** If the stream is interrupted, you may not receive the
   * final usage chunk which contains the total token usage for the request.
   */
  include_usage?: boolean;
};

/** A chat completion delta generated by streamed model responses. */
export interface ChatCompletionStreamResponseDelta {
  /** The contents of the chunk message. */
  content?: string | null;
  /**
   * Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.
   * @deprecated
   */
  function_call?: {
    /** The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function. */
    arguments?: string;
    /** The name of the function to call. */
    name?: string;
  };
  tool_calls?: ChatCompletionMessageToolCallChunk[];
  /** The role of the author of this message. */
  role?: "developer" | "system" | "user" | "assistant" | "tool";
  /** The refusal message generated by the model. */
  refusal?: string | null;
}

export interface ChatCompletionTokenLogprob {
  /** The token. */
  token: string;
  /** The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely. */
  logprob: number;
  /** A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token. */
  bytes: number[] | null;
  /** List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned. */
  top_logprobs: {
    /** The token. */
    token: string;
    /** The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely. */
    logprob: number;
    /** A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token. */
    bytes: number[] | null;
  }[];
}

export interface ChatCompletionTool {
  /** The type of the tool. Currently, only `function` is supported. */
  type: "function";
  function: FunctionObject;
}

/**
 * Controls which (if any) tool is called by the model.
 * `none` means the model will not call any tool and instead generates a message.
 * `auto` means the model can pick between generating a message or calling one or more tools.
 * `required` means the model must call one or more tools.
 * Specifying a particular tool via `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.
 *
 * `none` is the default when no tools are present. `auto` is the default if tools are present.
 */
export type ChatCompletionToolChoiceOption = "none" | "auto" | "required" | ChatCompletionNamedToolChoice;

/** The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. */
export type ChunkingStrategyRequestParam = AutoChunkingStrategyRequestParam | StaticChunkingStrategyRequestParam;

/**
 * Click
 * A click action.
 */
export interface Click {
  /**
   * Specifies the event type. For a click action, this property is
   * always set to `click`.
   * @default "click"
   */
  type: "click";
  /** Indicates which mouse button was pressed during the click. One of `left`, `right`, `wheel`, `back`, or `forward`. */
  button: "left" | "right" | "wheel" | "back" | "forward";
  /** The x-coordinate where the click occurred. */
  x: number;
  /** The y-coordinate where the click occurred. */
  y: number;
}

/**
 * Code interpreter file output
 * The output of a code interpreter tool call that is a file.
 */
export interface CodeInterpreterFileOutput {
  /** The type of the code interpreter file output. Always `files`. */
  type: "files";
  files: {
    /** The MIME type of the file. */
    mime_type: string;
    /** The ID of the file. */
    file_id: string;
  }[];
}

/**
 * Code interpreter output image
 * The image output from the code interpreter.
 */
export interface CodeInterpreterOutputImage {
  /**
   * The type of the output. Always 'image'.
   * @default "image"
   */
  type: "image";
  /** The URL of the image output from the code interpreter. */
  url: string;
}

/**
 * Code interpreter output logs
 * The logs output from the code interpreter.
 */
export interface CodeInterpreterOutputLogs {
  /**
   * The type of the output. Always 'logs'.
   * @default "logs"
   */
  type: "logs";
  /** The logs output from the code interpreter. */
  logs: string;
}

/**
 * Code interpreter text output
 * The output of a code interpreter tool call that is text.
 */
export interface CodeInterpreterTextOutput {
  /** The type of the code interpreter text output. Always `logs`. */
  type: "logs";
  /** The logs of the code interpreter tool call. */
  logs: string;
}

/**
 * Code interpreter
 * A tool that runs Python code to help generate a response to a prompt.
 */
export interface CodeInterpreterTool {
  /** The type of the code interpreter tool. Always `code_interpreter`. */
  type: "code_interpreter";
  /**
   * The code interpreter container. Can be a container ID or an object that
   * specifies uploaded file IDs to make available to your code.
   */
  container: string | CodeInterpreterToolAuto;
}

/**
 * CodeInterpreterContainerAuto
 * Configuration for a code interpreter container. Optionally specify the IDs
 * of the files to run the code on.
 */
export interface CodeInterpreterToolAuto {
  /** Always `auto`. */
  type: "auto";
  /** An optional list of uploaded files to make available to your code. */
  file_ids?: string[];
}

/**
 * Code interpreter tool call
 * A tool call to run code.
 */
export interface CodeInterpreterToolCall {
  /**
   * The type of the code interpreter tool call. Always `code_interpreter_call`.
   * @default "code_interpreter_call"
   */
  type: "code_interpreter_call";
  /** The unique ID of the code interpreter tool call. */
  id: string;
  /** The status of the code interpreter tool call. */
  status: "in_progress" | "completed" | "incomplete" | "interpreting" | "failed";
  /** The ID of the container used to run the code. */
  container_id: string;
  /** The code to run, or null if not available. */
  code: string | null;
  /**
   * The outputs generated by the code interpreter, such as logs or images.
   * Can be null if no outputs are available.
   */
  outputs: (CodeInterpreterOutputLogs | CodeInterpreterOutputImage)[] | null;
}

/**
 * Comparison Filter
 * A filter used to compare a specified attribute key to a given value using a defined comparison operation.
 */
export interface ComparisonFilter {
  /**
   * Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`.
   * - `eq`: equals
   * - `ne`: not equal
   * - `gt`: greater than
   * - `gte`: greater than or equal
   * - `lt`: less than
   * - `lte`: less than or equal
   * @default "eq"
   */
  type: "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
  /** The key to compare against the value. */
  key: string;
  /** The value to compare against the attribute key; supports string, number, or boolean types. */
  value: string | number | boolean;
}

export interface CompleteUploadRequest {
  /** The ordered list of Part IDs. */
  part_ids: string[];
  /** The optional md5 checksum for the file contents to verify if the bytes uploaded matches what you expect. */
  md5?: string;
}

/** Usage statistics for the completion request. */
export interface CompletionUsage {
  /**
   * Number of tokens in the generated completion.
   * @default 0
   */
  completion_tokens: number;
  /**
   * Number of tokens in the prompt.
   * @default 0
   */
  prompt_tokens: number;
  /**
   * Total number of tokens used in the request (prompt + completion).
   * @default 0
   */
  total_tokens: number;
  /** Breakdown of tokens used in a completion. */
  completion_tokens_details?: {
    /**
     * When using Predicted Outputs, the number of tokens in the
     * prediction that appeared in the completion.
     * @default 0
     */
    accepted_prediction_tokens?: number;
    /**
     * Audio input tokens generated by the model.
     * @default 0
     */
    audio_tokens?: number;
    /**
     * Tokens generated by the model for reasoning.
     * @default 0
     */
    reasoning_tokens?: number;
    /**
     * When using Predicted Outputs, the number of tokens in the
     * prediction that did not appear in the completion. However, like
     * reasoning tokens, these tokens are still counted in the total
     * completion tokens for purposes of billing, output, and context window
     * limits.
     * @default 0
     */
    rejected_prediction_tokens?: number;
  };
  /** Breakdown of tokens used in the prompt. */
  prompt_tokens_details?: {
    /**
     * Audio input tokens present in the prompt.
     * @default 0
     */
    audio_tokens?: number;
    /**
     * Cached tokens present in the prompt.
     * @default 0
     */
    cached_tokens?: number;
  };
}

/**
 * Compound Filter
 * Combine multiple filters using `and` or `or`.
 */
export interface CompoundFilter {
  /** Type of operation: `and` or `or`. */
  type: "and" | "or";
  /** Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`. */
  filters: ComparisonFilter[];
}

export type ComputerAction = Click | DoubleClick | Drag | KeyPress | Move | Screenshot | Scroll | Type | Wait;

/** A computer screenshot image used with the computer use tool. */
export interface ComputerScreenshotImage {
  /**
   * Specifies the event type. For a computer screenshot, this property is
   * always set to `computer_screenshot`.
   * @default "computer_screenshot"
   */
  type: "computer_screenshot";
  /** The URL of the screenshot image. */
  image_url?: string;
  /** The identifier of an uploaded file that contains the screenshot. */
  file_id?: string;
}

/**
 * Computer tool call
 * A tool call to a computer use tool. See the
 * [computer use guide](/docs/guides/tools-computer-use) for more information.
 */
export interface ComputerToolCall {
  /**
   * The type of the computer call. Always `computer_call`.
   * @default "computer_call"
   */
  type: "computer_call";
  /** The unique ID of the computer call. */
  id: string;
  /** An identifier used when responding to the tool call with output. */
  call_id: string;
  action: ComputerAction;
  /** The pending safety checks for the computer call. */
  pending_safety_checks: ComputerToolCallSafetyCheck[];
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   * `incomplete`. Populated when items are returned via API.
   */
  status: "in_progress" | "completed" | "incomplete";
}

/**
 * Computer tool call output
 * The output of a computer tool call.
 */
export interface ComputerToolCallOutput {
  /**
   * The type of the computer tool call output. Always `computer_call_output`.
   * @default "computer_call_output"
   */
  type: "computer_call_output";
  /** The ID of the computer tool call output. */
  id?: string;
  /** The ID of the computer tool call that produced the output. */
  call_id: string;
  /**
   * The safety checks reported by the API that have been acknowledged by the
   * developer.
   */
  acknowledged_safety_checks?: ComputerToolCallSafetyCheck[];
  /** A computer screenshot image used with the computer use tool. */
  output: ComputerScreenshotImage;
  /**
   * The status of the message input. One of `in_progress`, `completed`, or
   * `incomplete`. Populated when input items are returned via API.
   */
  status?: "in_progress" | "completed" | "incomplete";
}

export type ComputerToolCallOutputResource = ComputerToolCallOutput & {
  /** The unique ID of the computer call tool output. */
  id: string;
};

/** A pending safety check for the computer call. */
export interface ComputerToolCallSafetyCheck {
  /** The ID of the pending safety check. */
  id: string;
  /** The type of the pending safety check. */
  code: string;
  /** Details about the pending safety check. */
  message: string;
}

export interface ContainerFileListResource {
  /** The type of object returned, must be 'list'. */
  object: "list";
  /** A list of container files. */
  data: ContainerFileResource[];
  /** The ID of the first file in the list. */
  first_id: string;
  /** The ID of the last file in the list. */
  last_id: string;
  /** Whether there are more files available. */
  has_more: boolean;
}

/** The container file object */
export interface ContainerFileResource {
  /** Unique identifier for the file. */
  id: string;
  /** The type of this object (`container.file`). */
  object: string;
  /** The container this file belongs to. */
  container_id: string;
  /** Unix timestamp (in seconds) when the file was created. */
  created_at: number;
  /** Size of the file in bytes. */
  bytes: number;
  /** Path of the file in the container. */
  path: string;
  /** Source of the file (e.g., `user`, `assistant`). */
  source: string;
}

export interface ContainerListResource {
  /** The type of object returned, must be 'list'. */
  object: "list";
  /** A list of containers. */
  data: ContainerResource[];
  /** The ID of the first container in the list. */
  first_id: string;
  /** The ID of the last container in the list. */
  last_id: string;
  /** Whether there are more containers available. */
  has_more: boolean;
}

/** The container object */
export interface ContainerResource {
  /** Unique identifier for the container. */
  id: string;
  /** The type of this object. */
  object: string;
  /** Name of the container. */
  name: string;
  /** Unix timestamp (in seconds) when the container was created. */
  created_at: number;
  /** Status of the container (e.g., active, deleted). */
  status: string;
  /**
   * The container will expire after this time period.
   * The anchor is the reference point for the expiration.
   * The minutes is the number of minutes after the anchor before the container expires.
   */
  expires_after?: {
    /** The reference point for the expiration. */
    anchor?: "last_active_at";
    /** The number of minutes after the anchor before the container expires. */
    minutes?: number;
  };
}

/** Multi-modal input and output contents. */
export type Content = InputContent | OutputContent;

/**
 * Coordinate
 * An x/y coordinate pair, e.g. `{ x: 100, y: 200 }`.
 */
export interface Coordinate {
  /** The x-coordinate. */
  x: number;
  /** The y-coordinate. */
  y: number;
}

/** The aggregated costs details of the specific time bucket. */
export interface CostsResult {
  object: "organization.costs.result";
  /** The monetary value in its associated currency. */
  amount?: {
    /** The numeric value of the cost. */
    value?: number;
    /** Lowercase ISO-4217 currency e.g. "usd" */
    currency?: string;
  };
  /** When `group_by=line_item`, this field provides the line item of the grouped costs result. */
  line_item?: string | null;
  /** When `group_by=project_id`, this field provides the project ID of the grouped costs result. */
  project_id?: string | null;
}

export interface CreateAssistantRequest {
  /**
   * ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models) for descriptions of them.
   * @example "gpt-4o"
   */
  model: string | AssistantSupportedModels;
  /**
   * The name of the assistant. The maximum length is 256 characters.
   * @maxLength 256
   */
  name?: string | null;
  /**
   * The description of the assistant. The maximum length is 512 characters.
   * @maxLength 512
   */
  description?: string | null;
  /**
   * The system instructions that the assistant uses. The maximum length is 256,000 characters.
   * @maxLength 256000
   */
  instructions?: string | null;
  /**
   * **o-series models only**
   *
   * Constrains effort on reasoning for
   * [reasoning models](https://platform.openai.com/docs/guides/reasoning).
   * Currently supported values are `low`, `medium`, and `high`. Reducing
   * reasoning effort can result in faster responses and fewer tokens used
   * on reasoning in a response.
   */
  reasoning_effort?: ReasoningEffort;
  /**
   * A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.
   * @maxItems 128
   * @default []
   */
  tools?: (AssistantToolsCode | AssistantToolsFileSearch | AssistantToolsFunction)[];
  /** A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs. */
  tool_resources?: {
    code_interpreter?: {
      /**
       * A list of [file](/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.
       * @maxItems 20
       * @default []
       */
      file_ids?: string[];
    };
    file_search?: {
      /**
       * The [vector store](/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.
       * @maxItems 1
       */
      vector_store_ids?: string[];
      /**
       * A helper to create a [vector store](/docs/api-reference/vector-stores/object) with file_ids and attach it to this assistant. There can be a maximum of 1 vector store attached to the assistant.
       * @maxItems 1
       */
      vector_stores?: {
        /**
         * A list of [file](/docs/api-reference/files) IDs to add to the vector store. There can be a maximum of 10000 files in a vector store.
         * @maxItems 10000
         */
        file_ids?: string[];
        /** The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. */
        chunking_strategy?:
          | {
              /** Always `auto`. */
              type: "auto";
            }
          | {
              /** Always `static`. */
              type: "static";
              static: {
                /**
                 * The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.
                 * @min 100
                 * @max 4096
                 */
                max_chunk_size_tokens: number;
                /**
                 * The number of tokens that overlap between chunks. The default value is `400`.
                 *
                 * Note that the overlap must not exceed half of `max_chunk_size_tokens`.
                 */
                chunk_overlap_tokens: number;
              };
            };
        /**
         * Set of 16 key-value pairs that can be attached to an object. This can be
         * useful for storing additional information about the object in a structured
         * format, and querying for objects via API or the dashboard.
         *
         * Keys are strings with a maximum length of 64 characters. Values are strings
         * with a maximum length of 512 characters.
         */
        metadata?: Metadata;
      }[];
    };
  } | null;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * @min 0
   * @max 2
   * @default 1
   * @example 1
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   * @min 0
   * @max 1
   * @default 1
   * @example 1
   */
  top_p?: number | null;
  /**
   * Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.
   *
   * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).
   *
   * Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.
   *
   * **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.
   */
  response_format?: AssistantsApiResponseFormatOption | null;
}

export type CreateChatCompletionRequest = CreateModelResponseProperties & {
  /**
   * A list of messages comprising the conversation so far. Depending on the
   * [model](/docs/models) you use, different message types (modalities) are
   * supported, like [text](/docs/guides/text-generation),
   * [images](/docs/guides/vision), and [audio](/docs/guides/audio).
   * @minItems 1
   */
  messages: ChatCompletionRequestMessage[];
  /**
   * Model ID used to generate the response, like `gpt-4o` or `o3`. OpenAI
   * offers a wide range of models with different capabilities, performance
   * characteristics, and price points. Refer to the [model guide](/docs/models)
   * to browse and compare available models.
   */
  model: ModelIdsShared;
  /**
   * Output types that you would like the model to generate.
   * Most models are capable of generating text, which is the default:
   *
   * `["text"]`
   *
   * The `gpt-4o-audio-preview` model can also be used to
   * [generate audio](/docs/guides/audio). To request that this model generate
   * both text and audio responses, you can use:
   *
   * `["text", "audio"]`
   */
  modalities?: ResponseModalities;
  /**
   * **o-series models only**
   *
   * Constrains effort on reasoning for
   * [reasoning models](https://platform.openai.com/docs/guides/reasoning).
   * Currently supported values are `low`, `medium`, and `high`. Reducing
   * reasoning effort can result in faster responses and fewer tokens used
   * on reasoning in a response.
   */
  reasoning_effort?: ReasoningEffort;
  /** An upper bound for the number of tokens that can be generated for a completion, including visible output tokens and [reasoning tokens](/docs/guides/reasoning). */
  max_completion_tokens?: number | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on
   * their existing frequency in the text so far, decreasing the model's
   * likelihood to repeat the same line verbatim.
   * @min -2
   * @max 2
   * @default 0
   */
  frequency_penalty?: number | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on
   * whether they appear in the text so far, increasing the model's likelihood
   * to talk about new topics.
   * @min -2
   * @max 2
   * @default 0
   */
  presence_penalty?: number | null;
  /**
   * Web search
   * This tool searches the web for relevant results to use in a response.
   * Learn more about the [web search tool](/docs/guides/tools-web-search?api-mode=chat).
   */
  web_search_options?: {
    /** Approximate location parameters for the search. */
    user_location?: {
      /** The type of location approximation. Always `approximate`. */
      type: "approximate";
      /** Approximate location parameters for the search. */
      approximate: WebSearchLocation;
    } | null;
    /**
     * High level guidance for the amount of context window space to use for the
     * search. One of `low`, `medium`, or `high`. `medium` is the default.
     */
    search_context_size?: WebSearchContextSize;
  };
  /**
   * An integer between 0 and 20 specifying the number of most likely tokens to
   * return at each token position, each with an associated log probability.
   * `logprobs` must be set to `true` if this parameter is used.
   * @min 0
   * @max 20
   */
  top_logprobs?: number | null;
  /**
   * An object specifying the format that the model must output.
   *
   * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables
   * Structured Outputs which ensures the model will match your supplied JSON
   * schema. Learn more in the [Structured Outputs
   * guide](/docs/guides/structured-outputs).
   *
   * Setting to `{ "type": "json_object" }` enables the older JSON mode, which
   * ensures the message the model generates is valid JSON. Using `json_schema`
   * is preferred for models that support it.
   */
  response_format?: ResponseFormatText | ResponseFormatJsonSchema | ResponseFormatJsonObject;
  /**
   * Parameters for audio output. Required when audio output is requested with
   * `modalities: ["audio"]`. [Learn more](/docs/guides/audio).
   */
  audio?: {
    /**
     * The voice the model uses to respond. Supported voices are
     * `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `nova`, `onyx`, `sage`, and `shimmer`.
     */
    voice: VoiceIdsShared;
    /**
     * Specifies the output audio format. Must be one of `wav`, `mp3`, `flac`,
     * `opus`, or `pcm16`.
     */
    format: "wav" | "aac" | "mp3" | "flac" | "opus" | "pcm16";
  } | null;
  /**
   * Whether or not to store the output of this chat completion request for
   * use in our [model distillation](/docs/guides/distillation) or
   * [evals](/docs/guides/evals) products.
   *
   * Supports text and image inputs. Note: image inputs over 10MB will be dropped.
   * @default false
   */
  store?: boolean | null;
  /**
   * If set to true, the model response data will be streamed to the client
   * as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
   * See the [Streaming section below](/docs/api-reference/chat/streaming)
   * for more information, along with the [streaming responses](/docs/guides/streaming-responses)
   * guide for more information on how to handle the streaming events.
   * @default false
   */
  stream?: boolean | null;
  /**
   * Not supported with latest reasoning models `o3` and `o4-mini`.
   *
   * Up to 4 sequences where the API will stop generating further tokens. The
   * returned text will not contain the stop sequence.
   */
  stop?: StopConfiguration;
  /**
   * Modify the likelihood of specified tokens appearing in the completion.
   *
   * Accepts a JSON object that maps tokens (specified by their token ID in the
   * tokenizer) to an associated bias value from -100 to 100. Mathematically,
   * the bias is added to the logits generated by the model prior to sampling.
   * The exact effect will vary per model, but values between -1 and 1 should
   * decrease or increase likelihood of selection; values like -100 or 100
   * should result in a ban or exclusive selection of the relevant token.
   * @default null
   */
  logit_bias?: Record<string, number>;
  /**
   * Whether to return log probabilities of the output tokens or not. If true,
   * returns the log probabilities of each output token returned in the
   * `content` of `message`.
   * @default false
   */
  logprobs?: boolean | null;
  /**
   * The maximum number of [tokens](/tokenizer) that can be generated in the
   * chat completion. This value can be used to control
   * [costs](https://openai.com/api/pricing/) for text generated via API.
   *
   * This value is now deprecated in favor of `max_completion_tokens`, and is
   * not compatible with [o-series models](/docs/guides/reasoning).
   * @deprecated
   */
  max_tokens?: number | null;
  /**
   * How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep `n` as `1` to minimize costs.
   * @min 1
   * @max 128
   * @default 1
   * @example 1
   */
  n?: number | null;
  /**
   * Configuration for a [Predicted Output](/docs/guides/predicted-outputs),
   * which can greatly improve response times when large parts of the model
   * response are known ahead of time. This is most common when you are
   * regenerating a file with only minor changes to most of the content.
   */
  prediction?: PredictionContent | null;
  /**
   * This feature is in Beta.
   * If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed` and parameters should return the same result.
   * Determinism is not guaranteed, and you should refer to the `system_fingerprint` response parameter to monitor changes in the backend.
   * @min -9223372036854776000
   * @max 9223372036854776000
   */
  seed?: number | null;
  /** Options for streaming response. Only set this when you set `stream: true`. */
  stream_options?: ChatCompletionStreamOptions;
  /** A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported. */
  tools?: ChatCompletionTool[];
  /**
   * Controls which (if any) tool is called by the model.
   * `none` means the model will not call any tool and instead generates a message.
   * `auto` means the model can pick between generating a message or calling one or more tools.
   * `required` means the model must call one or more tools.
   * Specifying a particular tool via `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.
   *
   * `none` is the default when no tools are present. `auto` is the default if tools are present.
   */
  tool_choice?: ChatCompletionToolChoiceOption;
  /** Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use. */
  parallel_tool_calls?: ParallelToolCalls;
  /**
   * Deprecated in favor of `tool_choice`.
   *
   * Controls which (if any) function is called by the model.
   *
   * `none` means the model will not call a function and instead generates a
   * message.
   *
   * `auto` means the model can pick between generating a message or calling a
   * function.
   *
   * Specifying a particular function via `{"name": "my_function"}` forces the
   * model to call that function.
   *
   * `none` is the default when no functions are present. `auto` is the default
   * if functions are present.
   * @deprecated
   */
  function_call?: "none" | "auto" | ChatCompletionFunctionCallOption;
  /**
   * Deprecated in favor of `tools`.
   *
   * A list of functions the model may generate JSON inputs for.
   * @deprecated
   * @maxItems 128
   * @minItems 1
   */
  functions?: ChatCompletionFunctions[];
};

/** Represents a chat completion response returned by model, based on the provided input. */
export interface CreateChatCompletionResponse {
  /** A unique identifier for the chat completion. */
  id: string;
  /** A list of chat completion choices. Can be more than one if `n` is greater than 1. */
  choices: {
    /**
     * The reason the model stopped generating tokens. This will be `stop` if the model hit a natural stop point or a provided stop sequence,
     * `length` if the maximum number of tokens specified in the request was reached,
     * `content_filter` if content was omitted due to a flag from our content filters,
     * `tool_calls` if the model called a tool, or `function_call` (deprecated) if the model called a function.
     */
    finish_reason: "stop" | "length" | "tool_calls" | "content_filter" | "function_call";
    /** The index of the choice in the list of choices. */
    index: number;
    /** A chat completion message generated by the model. */
    message: ChatCompletionResponseMessage;
    /** Log probability information for the choice. */
    logprobs: {
      /** A list of message content tokens with log probability information. */
      content: ChatCompletionTokenLogprob[] | null;
      /** A list of message refusal tokens with log probability information. */
      refusal: ChatCompletionTokenLogprob[] | null;
    };
  }[];
  /** The Unix timestamp (in seconds) of when the chat completion was created. */
  created: number;
  /** The model used for the chat completion. */
  model: string;
  /**
   * Specifies the processing type used for serving the request.
   *   - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
   *   - If set to 'default', then the requset will be processed with the standard pricing and performance for the selected model.
   *   - If set to '[flex](/docs/guides/flex-processing)' or 'priority', then the request will be processed with the corresponding service tier. [Contact sales](https://openai.com/contact-sales) to learn more about Priority processing.
   *   - When not set, the default behavior is 'auto'.
   *
   *   When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.
   */
  service_tier?: ServiceTier;
  /**
   * This fingerprint represents the backend configuration that the model runs with.
   *
   * Can be used in conjunction with the `seed` request parameter to understand when backend changes have been made that might impact determinism.
   */
  system_fingerprint?: string;
  /** The object type, which is always `chat.completion`. */
  object: "chat.completion";
  /** Usage statistics for the completion request. */
  usage?: CompletionUsage;
}

/**
 * Represents a streamed chunk of a chat completion response returned
 * by the model, based on the provided input.
 * [Learn more](/docs/guides/streaming-responses).
 */
export interface CreateChatCompletionStreamResponse {
  /** A unique identifier for the chat completion. Each chunk has the same ID. */
  id: string;
  /**
   * A list of chat completion choices. Can contain more than one elements if `n` is greater than 1. Can also be empty for the
   * last chunk if you set `stream_options: {"include_usage": true}`.
   */
  choices: {
    /** A chat completion delta generated by streamed model responses. */
    delta: ChatCompletionStreamResponseDelta;
    /** Log probability information for the choice. */
    logprobs?: {
      /** A list of message content tokens with log probability information. */
      content: ChatCompletionTokenLogprob[] | null;
      /** A list of message refusal tokens with log probability information. */
      refusal: ChatCompletionTokenLogprob[] | null;
    };
    /**
     * The reason the model stopped generating tokens. This will be `stop` if the model hit a natural stop point or a provided stop sequence,
     * `length` if the maximum number of tokens specified in the request was reached,
     * `content_filter` if content was omitted due to a flag from our content filters,
     * `tool_calls` if the model called a tool, or `function_call` (deprecated) if the model called a function.
     */
    finish_reason: "stop" | "length" | "tool_calls" | "content_filter" | "function_call" | null;
    /** The index of the choice in the list of choices. */
    index: number;
  }[];
  /** The Unix timestamp (in seconds) of when the chat completion was created. Each chunk has the same timestamp. */
  created: number;
  /** The model to generate the completion. */
  model: string;
  /**
   * Specifies the processing type used for serving the request.
   *   - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
   *   - If set to 'default', then the requset will be processed with the standard pricing and performance for the selected model.
   *   - If set to '[flex](/docs/guides/flex-processing)' or 'priority', then the request will be processed with the corresponding service tier. [Contact sales](https://openai.com/contact-sales) to learn more about Priority processing.
   *   - When not set, the default behavior is 'auto'.
   *
   *   When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.
   */
  service_tier?: ServiceTier;
  /**
   * This fingerprint represents the backend configuration that the model runs with.
   * Can be used in conjunction with the `seed` request parameter to understand when backend changes have been made that might impact determinism.
   */
  system_fingerprint?: string;
  /** The object type, which is always `chat.completion.chunk`. */
  object: "chat.completion.chunk";
  /**
   * An optional field that will only be present when you set
   * `stream_options: {"include_usage": true}` in your request. When present, it
   * contains a null value **except for the last chunk** which contains the
   * token usage statistics for the entire request.
   *
   * **NOTE:** If the stream is interrupted or cancelled, you may not
   * receive the final usage chunk which contains the total token usage for
   * the request.
   */
  usage?: CompletionUsage | null;
}

export interface CreateCompletionRequest {
  /** ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models) for descriptions of them. */
  model: string | "gpt-3.5-turbo-instruct" | "davinci-002" | "babbage-002";
  /**
   * The prompt(s) to generate completions for, encoded as a string, array of strings, array of tokens, or array of token arrays.
   *
   * Note that <|endoftext|> is the document separator that the model sees during training, so if a prompt is not specified the model will generate as if from the beginning of a new document.
   * @default "<|endoftext|>"
   */
  prompt: string | string[] | number[] | number[][] | null;
  /**
   * Generates `best_of` completions server-side and returns the "best" (the one with the highest log probability per token). Results cannot be streamed.
   *
   * When used with `n`, `best_of` controls the number of candidate completions and `n` specifies how many to return – `best_of` must be greater than `n`.
   *
   * **Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
   * @min 0
   * @max 20
   * @default 1
   */
  best_of?: number | null;
  /**
   * Echo back the prompt in addition to the completion
   * @default false
   */
  echo?: boolean | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
   *
   * [See more information about frequency and presence penalties.](/docs/guides/text-generation)
   * @min -2
   * @max 2
   * @default 0
   */
  frequency_penalty?: number | null;
  /**
   * Modify the likelihood of specified tokens appearing in the completion.
   *
   * Accepts a JSON object that maps tokens (specified by their token ID in the GPT tokenizer) to an associated bias value from -100 to 100. You can use this [tokenizer tool](/tokenizer?view=bpe) to convert text to token IDs. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.
   *
   * As an example, you can pass `{"50256": -100}` to prevent the <|endoftext|> token from being generated.
   * @default null
   */
  logit_bias?: Record<string, number>;
  /**
   * Include the log probabilities on the `logprobs` most likely output tokens, as well the chosen tokens. For example, if `logprobs` is 5, the API will return a list of the 5 most likely tokens. The API will always return the `logprob` of the sampled token, so there may be up to `logprobs+1` elements in the response.
   *
   * The maximum value for `logprobs` is 5.
   * @min 0
   * @max 5
   * @default null
   */
  logprobs?: number | null;
  /**
   * The maximum number of [tokens](/tokenizer) that can be generated in the completion.
   *
   * The token count of your prompt plus `max_tokens` cannot exceed the model's context length. [Example Python code](https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken) for counting tokens.
   * @min 0
   * @default 16
   * @example 16
   */
  max_tokens?: number | null;
  /**
   * How many completions to generate for each prompt.
   *
   * **Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
   * @min 1
   * @max 128
   * @default 1
   * @example 1
   */
  n?: number | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
   *
   * [See more information about frequency and presence penalties.](/docs/guides/text-generation)
   * @min -2
   * @max 2
   * @default 0
   */
  presence_penalty?: number | null;
  /**
   * If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed` and parameters should return the same result.
   *
   * Determinism is not guaranteed, and you should refer to the `system_fingerprint` response parameter to monitor changes in the backend.
   * @format int64
   */
  seed?: number | null;
  /**
   * Not supported with latest reasoning models `o3` and `o4-mini`.
   *
   * Up to 4 sequences where the API will stop generating further tokens. The
   * returned text will not contain the stop sequence.
   */
  stop?: StopConfiguration;
  /**
   * Whether to stream back partial progress. If set, tokens will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available, with the stream terminated by a `data: [DONE]` message. [Example Python code](https://cookbook.openai.com/examples/how_to_stream_completions).
   * @default false
   */
  stream?: boolean | null;
  /** Options for streaming response. Only set this when you set `stream: true`. */
  stream_options?: ChatCompletionStreamOptions;
  /**
   * The suffix that comes after a completion of inserted text.
   *
   * This parameter is only supported for `gpt-3.5-turbo-instruct`.
   * @default null
   * @example "test."
   */
  suffix?: string | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   *
   * We generally recommend altering this or `top_p` but not both.
   * @min 0
   * @max 2
   * @default 1
   * @example 1
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   * @min 0
   * @max 1
   * @default 1
   * @example 1
   */
  top_p?: number | null;
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices#end-user-ids).
   * @example "user-1234"
   */
  user?: string;
}

/** Represents a completion response from the API. Note: both the streamed and non-streamed response objects share the same shape (unlike the chat endpoint). */
export interface CreateCompletionResponse {
  /** A unique identifier for the completion. */
  id: string;
  /** The list of completion choices the model generated for the input prompt. */
  choices: {
    /**
     * The reason the model stopped generating tokens. This will be `stop` if the model hit a natural stop point or a provided stop sequence,
     * `length` if the maximum number of tokens specified in the request was reached,
     * or `content_filter` if content was omitted due to a flag from our content filters.
     */
    finish_reason: "stop" | "length" | "content_filter";
    index: number;
    logprobs: {
      text_offset?: number[];
      token_logprobs?: number[];
      tokens?: string[];
      top_logprobs?: Record<string, number>[];
    } | null;
    text: string;
  }[];
  /** The Unix timestamp (in seconds) of when the completion was created. */
  created: number;
  /** The model used for completion. */
  model: string;
  /**
   * This fingerprint represents the backend configuration that the model runs with.
   *
   * Can be used in conjunction with the `seed` request parameter to understand when backend changes have been made that might impact determinism.
   */
  system_fingerprint?: string;
  /** The object type, which is always "text_completion" */
  object: "text_completion";
  /** Usage statistics for the completion request. */
  usage?: CompletionUsage;
}

export interface CreateContainerBody {
  /** Name of the container to create. */
  name: string;
  /** IDs of files to copy to the container. */
  file_ids?: string[];
  /** Container expiration time in seconds relative to the 'anchor' time. */
  expires_after?: {
    /** Time anchor for the expiration time. Currently only 'last_active_at' is supported. */
    anchor: "last_active_at";
    minutes: number;
  };
}

export interface CreateContainerFileBody {
  /** Name of the file to create. */
  file_id?: string;
  /**
   * The File object (not file name) to be uploaded.
   * @format binary
   */
  file?: File;
}

export interface CreateEmbeddingRequest {
  /**
   * Input text to embed, encoded as a string or array of tokens. To embed multiple inputs in a single request, pass an array of strings or array of token arrays. The input must not exceed the max input tokens for the model (8192 tokens for all embedding models), cannot be an empty string, and any array must be 2048 dimensions or less. [Example Python code](https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken) for counting tokens. In addition to the per-input token limit, all embedding  models enforce a maximum of 300,000 tokens summed across all inputs in a  single request.
   * @example "The quick brown fox jumped over the lazy dog"
   */
  input: string | string[] | number[] | number[][];
  /**
   * ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models) for descriptions of them.
   * @example "text-embedding-3-small"
   */
  model: string | "text-embedding-ada-002" | "text-embedding-3-small" | "text-embedding-3-large";
  /**
   * The format to return the embeddings in. Can be either `float` or [`base64`](https://pypi.org/project/pybase64/).
   * @default "float"
   * @example "float"
   */
  encoding_format?: "float" | "base64";
  /**
   * The number of dimensions the resulting output embeddings should have. Only supported in `text-embedding-3` and later models.
   * @min 1
   */
  dimensions?: number;
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices#end-user-ids).
   * @example "user-1234"
   */
  user?: string;
}

export interface CreateEmbeddingResponse {
  /** The list of embeddings generated by the model. */
  data: Embedding[];
  /** The name of the model used to generate the embedding. */
  model: string;
  /** The object type, which is always "list". */
  object: "list";
  /** The usage information for the request. */
  usage: {
    /** The number of tokens used by the prompt. */
    prompt_tokens: number;
    /** The total number of tokens used by the request. */
    total_tokens: number;
  };
}

/**
 * CompletionsRunDataSource
 * A CompletionsRunDataSource object describing a model sampling configuration.
 */
export interface CreateEvalCompletionsRunDataSource {
  /**
   * The type of run data source. Always `completions`.
   * @default "completions"
   */
  type: "completions";
  /** Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace. */
  input_messages?:
    | {
        /** The type of input messages. Always `template`. */
        type: "template";
        /** A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}. */
        template: (EasyInputMessage | EvalItem)[];
      }
    | {
        /** The type of input messages. Always `item_reference`. */
        type: "item_reference";
        /** A reference to a variable in the `item` namespace. Ie, "item.input_trajectory" */
        item_reference: string;
      };
  sampling_params?: {
    /**
     * A higher temperature increases randomness in the outputs.
     * @default 1
     */
    temperature?: number;
    /** The maximum number of tokens in the generated output. */
    max_completion_tokens?: number;
    /**
     * An alternative to temperature for nucleus sampling; 1.0 includes all tokens.
     * @default 1
     */
    top_p?: number;
    /**
     * A seed value to initialize the randomness, during sampling.
     * @default 42
     */
    seed?: number;
    /**
     * An object specifying the format that the model must output.
     *
     * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables
     * Structured Outputs which ensures the model will match your supplied JSON
     * schema. Learn more in the [Structured Outputs
     * guide](/docs/guides/structured-outputs).
     *
     * Setting to `{ "type": "json_object" }` enables the older JSON mode, which
     * ensures the message the model generates is valid JSON. Using `json_schema`
     * is preferred for models that support it.
     */
    response_format?: ResponseFormatText | ResponseFormatJsonSchema | ResponseFormatJsonObject;
    /** A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported. */
    tools?: ChatCompletionTool[];
  };
  /** The name of the model to use for generating completions (e.g. "o3-mini"). */
  model?: string;
  /** Determines what populates the `item` namespace in this run's data source. */
  source: EvalJsonlFileContentSource | EvalJsonlFileIdSource | EvalStoredCompletionsSource;
}

/**
 * CustomDataSourceConfig
 * A CustomDataSourceConfig object that defines the schema for the data source used for the evaluation runs.
 * This schema is used to define the shape of the data that will be:
 * - Used to define your testing criteria and
 * - What data is required when creating a run
 */
export interface CreateEvalCustomDataSourceConfig {
  /**
   * The type of data source. Always `custom`.
   * @default "custom"
   */
  type: "custom";
  /**
   * The json schema for each row in the data source.
   * @example "{
   *   "type": "object",
   *   "properties": {
   *     "name": {"type": "string"},
   *     "age": {"type": "integer"}
   *   },
   *   "required": ["name", "age"]
   * }
   * "
   */
  item_schema: Record<string, any>;
  /**
   * Whether the eval should expect you to populate the sample namespace (ie, by generating responses off of your data source)
   * @default false
   */
  include_sample_schema?: boolean;
}

/**
 * CreateEvalItem
 * A chat message that makes up the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.
 */
export type CreateEvalItem =
  | {
      /** The role of the message (e.g. "system", "assistant", "user"). */
      role: string;
      /** The content of the message. */
      content: string;
    }
  | EvalItem;

/**
 * JsonlRunDataSource
 * A JsonlRunDataSource object with that specifies a JSONL file that matches the eval
 */
export interface CreateEvalJsonlRunDataSource {
  /**
   * The type of data source. Always `jsonl`.
   * @default "jsonl"
   */
  type: "jsonl";
  /** Determines what populates the `item` namespace in the data source. */
  source: EvalJsonlFileContentSource | EvalJsonlFileIdSource;
}

/**
 * LabelModelGrader
 * A LabelModelGrader object which uses a model to assign labels to each item
 * in the evaluation.
 */
export interface CreateEvalLabelModelGrader {
  /** The object type, which is always `label_model`. */
  type: "label_model";
  /** The name of the grader. */
  name: string;
  /** The model to use for the evaluation. Must support structured outputs. */
  model: string;
  /** A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}. */
  input: CreateEvalItem[];
  /** The labels to classify to each item in the evaluation. */
  labels: string[];
  /** The labels that indicate a passing result. Must be a subset of labels. */
  passing_labels: string[];
}

/**
 * LogsDataSourceConfig
 * A data source config which specifies the metadata property of your logs query.
 * This is usually metadata like `usecase=chatbot` or `prompt-version=v2`, etc.
 */
export interface CreateEvalLogsDataSourceConfig {
  /**
   * The type of data source. Always `logs`.
   * @default "logs"
   */
  type: "logs";
  /**
   * Metadata filters for the logs data source.
   * @example "{
   *   "use_case": "customer_support_agent"
   * }
   * "
   */
  metadata?: Record<string, any>;
}

/** CreateEvalRequest */
export interface CreateEvalRequest {
  /** The name of the evaluation. */
  name?: string;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
  /** The configuration for the data source used for the evaluation runs. Dictates the schema of the data used in the evaluation. */
  data_source_config:
    | CreateEvalCustomDataSourceConfig
    | CreateEvalLogsDataSourceConfig
    | CreateEvalStoredCompletionsDataSourceConfig;
  /** A list of graders for all eval runs in this group. Graders can reference variables in the data source using double curly braces notation, like `{{item.variable_name}}`. To reference the model's output, use the `sample` namespace (ie, `{{sample.output_text}}`). */
  testing_criteria: (
    | CreateEvalLabelModelGrader
    | EvalGraderStringCheck
    | EvalGraderTextSimilarity
    | EvalGraderPython
    | EvalGraderScoreModel
  )[];
}

/**
 * ResponsesRunDataSource
 * A ResponsesRunDataSource object describing a model sampling configuration.
 */
export interface CreateEvalResponsesRunDataSource {
  /**
   * The type of run data source. Always `responses`.
   * @default "responses"
   */
  type: "responses";
  /** Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace. */
  input_messages?:
    | {
        /** The type of input messages. Always `template`. */
        type: "template";
        /** A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}. */
        template: (
          | {
              /** The role of the message (e.g. "system", "assistant", "user"). */
              role: string;
              /** The content of the message. */
              content: string;
            }
          | EvalItem
        )[];
      }
    | {
        /** The type of input messages. Always `item_reference`. */
        type: "item_reference";
        /** A reference to a variable in the `item` namespace. Ie, "item.name" */
        item_reference: string;
      };
  sampling_params?: {
    /**
     * A higher temperature increases randomness in the outputs.
     * @default 1
     */
    temperature?: number;
    /** The maximum number of tokens in the generated output. */
    max_completion_tokens?: number;
    /**
     * An alternative to temperature for nucleus sampling; 1.0 includes all tokens.
     * @default 1
     */
    top_p?: number;
    /**
     * A seed value to initialize the randomness, during sampling.
     * @default 42
     */
    seed?: number;
    /**
     * An array of tools the model may call while generating a response. You
     * can specify which tool to use by setting the `tool_choice` parameter.
     *
     * The two categories of tools you can provide the model are:
     *
     * - **Built-in tools**: Tools that are provided by OpenAI that extend the
     *   model's capabilities, like [web search](/docs/guides/tools-web-search)
     *   or [file search](/docs/guides/tools-file-search). Learn more about
     *   [built-in tools](/docs/guides/tools).
     * - **Function calls (custom tools)**: Functions that are defined by you,
     *   enabling the model to call your own code. Learn more about
     *   [function calling](/docs/guides/function-calling).
     */
    tools?: Tool[];
    /**
     * Configuration options for a text response from the model. Can be plain
     * text or structured JSON data. Learn more:
     * - [Text inputs and outputs](/docs/guides/text)
     * - [Structured Outputs](/docs/guides/structured-outputs)
     */
    text?: {
      /**
       * An object specifying the format that the model must output.
       *
       * Configuring `{ "type": "json_schema" }` enables Structured Outputs,
       * which ensures the model will match your supplied JSON schema. Learn more in the
       * [Structured Outputs guide](/docs/guides/structured-outputs).
       *
       * The default format is `{ "type": "text" }` with no additional options.
       *
       * **Not recommended for gpt-4o and newer models:**
       *
       * Setting to `{ "type": "json_object" }` enables the older JSON mode, which
       * ensures the message the model generates is valid JSON. Using `json_schema`
       * is preferred for models that support it.
       */
      format?: TextResponseFormatConfiguration;
    };
  };
  /** The name of the model to use for generating completions (e.g. "o3-mini"). */
  model?: string;
  /** Determines what populates the `item` namespace in this run's data source. */
  source: EvalJsonlFileContentSource | EvalJsonlFileIdSource | EvalResponsesSource;
}

/** CreateEvalRunRequest */
export interface CreateEvalRunRequest {
  /** The name of the run. */
  name?: string;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
  /** Details about the run's data source. */
  data_source: CreateEvalJsonlRunDataSource | CreateEvalCompletionsRunDataSource | CreateEvalResponsesRunDataSource;
}

/**
 * StoredCompletionsDataSourceConfig
 * Deprecated in favor of LogsDataSourceConfig.
 * @deprecated
 */
export interface CreateEvalStoredCompletionsDataSourceConfig {
  /**
   * The type of data source. Always `stored_completions`.
   * @default "stored_completions"
   */
  type: "stored_completions";
  /**
   * Metadata filters for the stored completions data source.
   * @example "{
   *   "use_case": "customer_support_agent"
   * }
   * "
   */
  metadata?: Record<string, any>;
}

export interface CreateFileRequest {
  /**
   * The File object (not file name) to be uploaded.
   * @format binary
   */
  file: File;
  /** The intended purpose of the uploaded file. One of: - `assistants`: Used in the Assistants API - `batch`: Used in the Batch API - `fine-tune`: Used for fine-tuning - `vision`: Images used for vision fine-tuning - `user_data`: Flexible file type for any purpose - `evals`: Used for eval data sets */
  purpose: "assistants" | "batch" | "fine-tune" | "vision" | "user_data" | "evals";
}

export interface CreateFineTuningCheckpointPermissionRequest {
  /** The project identifiers to grant access to. */
  project_ids: string[];
}

export interface CreateFineTuningJobRequest {
  /**
   * The name of the model to fine-tune. You can select one of the
   * [supported models](/docs/guides/fine-tuning#which-models-can-be-fine-tuned).
   * @example "gpt-4o-mini"
   */
  model: string | "babbage-002" | "davinci-002" | "gpt-3.5-turbo" | "gpt-4o-mini";
  /**
   * The ID of an uploaded file that contains training data.
   *
   * See [upload file](/docs/api-reference/files/create) for how to upload a file.
   *
   * Your dataset must be formatted as a JSONL file. Additionally, you must upload your file with the purpose `fine-tune`.
   *
   * The contents of the file should differ depending on if the model uses the [chat](/docs/api-reference/fine-tuning/chat-input), [completions](/docs/api-reference/fine-tuning/completions-input) format, or if the fine-tuning method uses the [preference](/docs/api-reference/fine-tuning/preference-input) format.
   *
   * See the [fine-tuning guide](/docs/guides/model-optimization) for more details.
   * @example "file-abc123"
   */
  training_file: string;
  /**
   * The hyperparameters used for the fine-tuning job.
   * This value is now deprecated in favor of `method`, and should be passed in under the `method` parameter.
   * @deprecated
   */
  hyperparameters?: {
    /**
     * Number of examples in each batch. A larger batch size means that model parameters
     * are updated less frequently, but with lower variance.
     * @default "auto"
     */
    batch_size?: "auto" | number;
    /**
     * Scaling factor for the learning rate. A smaller learning rate may be useful to avoid
     * overfitting.
     * @default "auto"
     */
    learning_rate_multiplier?: "auto" | number;
    /**
     * The number of epochs to train the model for. An epoch refers to one full cycle
     * through the training dataset.
     * @default "auto"
     */
    n_epochs?: "auto" | number;
  };
  /**
   * A string of up to 64 characters that will be added to your fine-tuned model name.
   *
   * For example, a `suffix` of "custom-model-name" would produce a model name like `ft:gpt-4o-mini:openai:custom-model-name:7p4lURel`.
   * @minLength 1
   * @maxLength 64
   * @default null
   */
  suffix?: string | null;
  /**
   * The ID of an uploaded file that contains validation data.
   *
   * If you provide this file, the data is used to generate validation
   * metrics periodically during fine-tuning. These metrics can be viewed in
   * the fine-tuning results file.
   * The same data should not be present in both train and validation files.
   *
   * Your dataset must be formatted as a JSONL file. You must upload your file with the purpose `fine-tune`.
   *
   * See the [fine-tuning guide](/docs/guides/model-optimization) for more details.
   * @example "file-abc123"
   */
  validation_file?: string | null;
  /** A list of integrations to enable for your fine-tuning job. */
  integrations?: {
    /** The type of integration to enable. Currently, only "wandb" (Weights and Biases) is supported. */
    type: "wandb";
    /**
     * The settings for your integration with Weights and Biases. This payload specifies the project that
     * metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
     * to your run, and set a default entity (team, username, etc) to be associated with your run.
     */
    wandb: {
      /**
       * The name of the project that the new run will be created under.
       * @example "my-wandb-project"
       */
      project: string;
      /** A display name to set for the run. If not set, we will use the Job ID as the name. */
      name?: string | null;
      /**
       * The entity to use for the run. This allows you to set the team or username of the WandB user that you would
       * like associated with the run. If not set, the default entity for the registered WandB API key is used.
       */
      entity?: string | null;
      /**
       * A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
       * default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".
       */
      tags?: string[];
    };
  }[];
  /**
   * The seed controls the reproducibility of the job. Passing in the same seed and job parameters should produce the same results, but may differ in rare cases.
   * If a seed is not specified, one will be generated for you.
   * @min 0
   * @max 2147483647
   * @example 42
   */
  seed?: number | null;
  /** The method used for fine-tuning. */
  method?: FineTuneMethod;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
}

export interface CreateImageEditRequest {
  /**
   * The image(s) to edit. Must be a supported image file or an array of images.
   *
   * For `gpt-image-1`, each image should be a `png`, `webp`, or `jpg` file less
   * than 50MB. You can provide up to 16 images.
   *
   * For `dall-e-2`, you can only provide one image, and it should be a square
   * `png` file less than 4MB.
   */
  image: File | File[];
  /**
   * A text description of the desired image(s). The maximum length is 1000 characters for `dall-e-2`, and 32000 characters for `gpt-image-1`.
   * @example "A cute baby sea otter wearing a beret"
   */
  prompt: string;
  /**
   * An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where `image` should be edited. If there are multiple images provided, the mask will be applied on the first image. Must be a valid PNG file, less than 4MB, and have the same dimensions as `image`.
   * @format binary
   */
  mask?: File;
  /**
   * Allows to set transparency for the background of the generated image(s).
   * This parameter is only supported for `gpt-image-1`. Must be one of
   * `transparent`, `opaque` or `auto` (default value). When `auto` is used, the
   * model will automatically determine the best background for the image.
   *
   * If `transparent`, the output format needs to support transparency, so it
   * should be set to either `png` (default value) or `webp`.
   * @default "auto"
   * @example "transparent"
   */
  background?: "transparent" | "opaque" | "auto" | null;
  /**
   * The model to use for image generation. Only `dall-e-2` and `gpt-image-1` are supported. Defaults to `dall-e-2` unless a parameter specific to `gpt-image-1` is used.
   * @default "dall-e-2"
   * @example "gpt-image-1"
   */
  model?: string | "dall-e-2" | "gpt-image-1" | null;
  /**
   * The number of images to generate. Must be between 1 and 10.
   * @min 1
   * @max 10
   * @default 1
   * @example 1
   */
  n?: number | null;
  /**
   * The size of the generated images. Must be one of `1024x1024`, `1536x1024` (landscape), `1024x1536` (portrait), or `auto` (default value) for `gpt-image-1`, and one of `256x256`, `512x512`, or `1024x1024` for `dall-e-2`.
   * @default "1024x1024"
   * @example "1024x1024"
   */
  size?: "256x256" | "512x512" | "1024x1024" | "1536x1024" | "1024x1536" | "auto" | null;
  /**
   * The format in which the generated images are returned. Must be one of `url` or `b64_json`. URLs are only valid for 60 minutes after the image has been generated. This parameter is only supported for `dall-e-2`, as `gpt-image-1` will always return base64-encoded images.
   * @default "url"
   * @example "url"
   */
  response_format?: "url" | "b64_json" | null;
  /**
   * The format in which the generated images are returned. This parameter is
   * only supported for `gpt-image-1`. Must be one of `png`, `jpeg`, or `webp`.
   * The default value is `png`.
   * @default "png"
   * @example "png"
   */
  output_format?: "png" | "jpeg" | "webp" | null;
  /**
   * The compression level (0-100%) for the generated images. This parameter
   * is only supported for `gpt-image-1` with the `webp` or `jpeg` output
   * formats, and defaults to 100.
   * @default 100
   * @example 100
   */
  output_compression?: number | null;
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices#end-user-ids).
   * @example "user-1234"
   */
  user?: string;
  /**
   * The quality of the image that will be generated. `high`, `medium` and `low` are only supported for `gpt-image-1`. `dall-e-2` only supports `standard` quality. Defaults to `auto`.
   * @default "auto"
   * @example "high"
   */
  quality?: "standard" | "low" | "medium" | "high" | "auto" | null;
}

export interface CreateImageRequest {
  /**
   * A text description of the desired image(s). The maximum length is 32000 characters for `gpt-image-1`, 1000 characters for `dall-e-2` and 4000 characters for `dall-e-3`.
   * @example "A cute baby sea otter"
   */
  prompt: string;
  /**
   * The model to use for image generation. One of `dall-e-2`, `dall-e-3`, or `gpt-image-1`. Defaults to `dall-e-2` unless a parameter specific to `gpt-image-1` is used.
   * @default "dall-e-2"
   * @example "gpt-image-1"
   */
  model?: string | "dall-e-2" | "dall-e-3" | "gpt-image-1" | null;
  /**
   * The number of images to generate. Must be between 1 and 10. For `dall-e-3`, only `n=1` is supported.
   * @min 1
   * @max 10
   * @default 1
   * @example 1
   */
  n?: number | null;
  /**
   * The quality of the image that will be generated.
   *
   * - `auto` (default value) will automatically select the best quality for the given model.
   * - `high`, `medium` and `low` are supported for `gpt-image-1`.
   * - `hd` and `standard` are supported for `dall-e-3`.
   * - `standard` is the only option for `dall-e-2`.
   * @default "auto"
   * @example "medium"
   */
  quality?: "standard" | "hd" | "low" | "medium" | "high" | "auto" | null;
  /**
   * The format in which generated images with `dall-e-2` and `dall-e-3` are returned. Must be one of `url` or `b64_json`. URLs are only valid for 60 minutes after the image has been generated. This parameter isn't supported for `gpt-image-1` which will always return base64-encoded images.
   * @default "url"
   * @example "url"
   */
  response_format?: "url" | "b64_json" | null;
  /**
   * The format in which the generated images are returned. This parameter is only supported for `gpt-image-1`. Must be one of `png`, `jpeg`, or `webp`.
   * @default "png"
   * @example "png"
   */
  output_format?: "png" | "jpeg" | "webp" | null;
  /**
   * The compression level (0-100%) for the generated images. This parameter is only supported for `gpt-image-1` with the `webp` or `jpeg` output formats, and defaults to 100.
   * @default 100
   * @example 100
   */
  output_compression?: number | null;
  /**
   * The size of the generated images. Must be one of `1024x1024`, `1536x1024` (landscape), `1024x1536` (portrait), or `auto` (default value) for `gpt-image-1`, one of `256x256`, `512x512`, or `1024x1024` for `dall-e-2`, and one of `1024x1024`, `1792x1024`, or `1024x1792` for `dall-e-3`.
   * @default "auto"
   * @example "1024x1024"
   */
  size?: "auto" | "1024x1024" | "1536x1024" | "1024x1536" | "256x256" | "512x512" | "1792x1024" | "1024x1792" | null;
  /**
   * Control the content-moderation level for images generated by `gpt-image-1`. Must be either `low` for less restrictive filtering or `auto` (default value).
   * @default "auto"
   * @example "low"
   */
  moderation?: "low" | "auto" | null;
  /**
   * Allows to set transparency for the background of the generated image(s).
   * This parameter is only supported for `gpt-image-1`. Must be one of
   * `transparent`, `opaque` or `auto` (default value). When `auto` is used, the
   * model will automatically determine the best background for the image.
   *
   * If `transparent`, the output format needs to support transparency, so it
   * should be set to either `png` (default value) or `webp`.
   * @default "auto"
   * @example "transparent"
   */
  background?: "transparent" | "opaque" | "auto" | null;
  /**
   * The style of the generated images. This parameter is only supported for `dall-e-3`. Must be one of `vivid` or `natural`. Vivid causes the model to lean towards generating hyper-real and dramatic images. Natural causes the model to produce more natural, less hyper-real looking images.
   * @default "vivid"
   * @example "vivid"
   */
  style?: "vivid" | "natural" | null;
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices#end-user-ids).
   * @example "user-1234"
   */
  user?: string;
}

export interface CreateImageVariationRequest {
  /**
   * The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
   * @format binary
   */
  image: File;
  /**
   * The model to use for image generation. Only `dall-e-2` is supported at this time.
   * @default "dall-e-2"
   * @example "dall-e-2"
   */
  model?: string | "dall-e-2" | null;
  /**
   * The number of images to generate. Must be between 1 and 10.
   * @min 1
   * @max 10
   * @default 1
   * @example 1
   */
  n?: number | null;
  /**
   * The format in which the generated images are returned. Must be one of `url` or `b64_json`. URLs are only valid for 60 minutes after the image has been generated.
   * @default "url"
   * @example "url"
   */
  response_format?: "url" | "b64_json" | null;
  /**
   * The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`.
   * @default "1024x1024"
   * @example "1024x1024"
   */
  size?: "256x256" | "512x512" | "1024x1024" | null;
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices#end-user-ids).
   * @example "user-1234"
   */
  user?: string;
}

export interface CreateMessageRequest {
  /**
   * The role of the entity that is creating the message. Allowed values include:
   * - `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.
   * - `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.
   */
  role: "user" | "assistant";
  /** The text contents of the message. */
  content: string | (MessageContentImageFileObject | MessageContentImageUrlObject | MessageRequestContentTextObject)[];
  /** A list of files attached to the message, and the tools they should be added to. */
  attachments?:
    | {
        /** The ID of the file to attach to the message. */
        file_id?: string;
        /** The tools to add this file to. */
        tools?: (AssistantToolsCode | AssistantToolsFileSearchTypeOnly)[];
      }[]
    | null;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
}

export type CreateModelResponseProperties = ModelResponseProperties & {
  /**
   * An integer between 0 and 20 specifying the number of most likely tokens to
   * return at each token position, each with an associated log probability.
   * @min 0
   * @max 20
   */
  top_logprobs?: number;
};

export interface CreateModerationRequest {
  /**
   * Input (or inputs) to classify. Can be a single string, an array of strings, or
   * an array of multi-modal input objects similar to other models.
   */
  input:
    | string
    | string[]
    | (
        | {
            /** Always `image_url`. */
            type: "image_url";
            /** Contains either an image URL or a data URL for a base64 encoded image. */
            image_url: {
              /**
               * Either a URL of the image or the base64 encoded image data.
               * @format uri
               * @example "https://example.com/image.jpg"
               */
              url: string;
            };
          }
        | {
            /** Always `text`. */
            type: "text";
            /**
             * A string of text to classify.
             * @example "I want to kill them"
             */
            text: string;
          }
      )[];
  /**
   * The content moderation model you would like to use. Learn more in
   * [the moderation guide](/docs/guides/moderation), and learn about
   * available models [here](/docs/models#moderation).
   * @default "omni-moderation-latest"
   * @example "omni-moderation-2024-09-26"
   */
  model?:
    | string
    | "omni-moderation-latest"
    | "omni-moderation-2024-09-26"
    | "text-moderation-latest"
    | "text-moderation-stable";
}

/** Represents if a given text input is potentially harmful. */
export interface CreateModerationResponse {
  /** The unique identifier for the moderation request. */
  id: string;
  /** The model used to generate the moderation results. */
  model: string;
  /** A list of moderation objects. */
  results: {
    /** Whether any of the below categories are flagged. */
    flagged: boolean;
    /** A list of the categories, and whether they are flagged or not. */
    categories: {
      /** Content that expresses, incites, or promotes hate based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste. Hateful content aimed at non-protected groups (e.g., chess players) is harassment. */
      hate: boolean;
      /** Hateful content that also includes violence or serious harm towards the targeted group based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste. */
      "hate/threatening": boolean;
      /** Content that expresses, incites, or promotes harassing language towards any target. */
      harassment: boolean;
      /** Harassment content that also includes violence or serious harm towards any target. */
      "harassment/threatening": boolean;
      /** Content that includes instructions or advice that facilitate the planning or execution of wrongdoing, or that gives advice or instruction on how to commit illicit acts. For example, "how to shoplift" would fit this category. */
      illicit: boolean | null;
      /** Content that includes instructions or advice that facilitate the planning or execution of wrongdoing that also includes violence, or that gives advice or instruction on the procurement of any weapon. */
      "illicit/violent": boolean | null;
      /** Content that promotes, encourages, or depicts acts of self-harm, such as suicide, cutting, and eating disorders. */
      "self-harm": boolean;
      /** Content where the speaker expresses that they are engaging or intend to engage in acts of self-harm, such as suicide, cutting, and eating disorders. */
      "self-harm/intent": boolean;
      /** Content that encourages performing acts of self-harm, such as suicide, cutting, and eating disorders, or that gives instructions or advice on how to commit such acts. */
      "self-harm/instructions": boolean;
      /** Content meant to arouse sexual excitement, such as the description of sexual activity, or that promotes sexual services (excluding sex education and wellness). */
      sexual: boolean;
      /** Sexual content that includes an individual who is under 18 years old. */
      "sexual/minors": boolean;
      /** Content that depicts death, violence, or physical injury. */
      violence: boolean;
      /** Content that depicts death, violence, or physical injury in graphic detail. */
      "violence/graphic": boolean;
    };
    /** A list of the categories along with their scores as predicted by model. */
    category_scores: {
      /** The score for the category 'hate'. */
      hate: number;
      /** The score for the category 'hate/threatening'. */
      "hate/threatening": number;
      /** The score for the category 'harassment'. */
      harassment: number;
      /** The score for the category 'harassment/threatening'. */
      "harassment/threatening": number;
      /** The score for the category 'illicit'. */
      illicit: number;
      /** The score for the category 'illicit/violent'. */
      "illicit/violent": number;
      /** The score for the category 'self-harm'. */
      "self-harm": number;
      /** The score for the category 'self-harm/intent'. */
      "self-harm/intent": number;
      /** The score for the category 'self-harm/instructions'. */
      "self-harm/instructions": number;
      /** The score for the category 'sexual'. */
      sexual: number;
      /** The score for the category 'sexual/minors'. */
      "sexual/minors": number;
      /** The score for the category 'violence'. */
      violence: number;
      /** The score for the category 'violence/graphic'. */
      "violence/graphic": number;
    };
    /** A list of the categories along with the input type(s) that the score applies to. */
    category_applied_input_types: {
      /** The applied input type(s) for the category 'hate'. */
      hate: "text"[];
      /** The applied input type(s) for the category 'hate/threatening'. */
      "hate/threatening": "text"[];
      /** The applied input type(s) for the category 'harassment'. */
      harassment: "text"[];
      /** The applied input type(s) for the category 'harassment/threatening'. */
      "harassment/threatening": "text"[];
      /** The applied input type(s) for the category 'illicit'. */
      illicit: "text"[];
      /** The applied input type(s) for the category 'illicit/violent'. */
      "illicit/violent": "text"[];
      /** The applied input type(s) for the category 'self-harm'. */
      "self-harm": ("text" | "image")[];
      /** The applied input type(s) for the category 'self-harm/intent'. */
      "self-harm/intent": ("text" | "image")[];
      /** The applied input type(s) for the category 'self-harm/instructions'. */
      "self-harm/instructions": ("text" | "image")[];
      /** The applied input type(s) for the category 'sexual'. */
      sexual: ("text" | "image")[];
      /** The applied input type(s) for the category 'sexual/minors'. */
      "sexual/minors": "text"[];
      /** The applied input type(s) for the category 'violence'. */
      violence: ("text" | "image")[];
      /** The applied input type(s) for the category 'violence/graphic'. */
      "violence/graphic": ("text" | "image")[];
    };
  }[];
}

export type CreateResponse = CreateModelResponseProperties &
  ResponseProperties & {
    /**
     * Text, image, or file inputs to the model, used to generate a response.
     *
     * Learn more:
     * - [Text inputs and outputs](/docs/guides/text)
     * - [Image inputs](/docs/guides/images)
     * - [File inputs](/docs/guides/pdf-files)
     * - [Conversation state](/docs/guides/conversation-state)
     * - [Function calling](/docs/guides/function-calling)
     */
    input?: string | InputItem[];
    /**
     * Specify additional output data to include in the model response. Currently
     * supported values are:
     * - `code_interpreter_call.outputs`: Includes the outputs of python code execution
     *   in code interpreter tool call items.
     * - `computer_call_output.output.image_url`: Include image urls from the computer call output.
     * - `file_search_call.results`: Include the search results of
     *   the file search tool call.
     * - `message.input_image.image_url`: Include image urls from the input message.
     * - `message.output_text.logprobs`: Include logprobs with assistant messages.
     * - `reasoning.encrypted_content`: Includes an encrypted version of reasoning
     *   tokens in reasoning item outputs. This enables reasoning items to be used in
     *   multi-turn conversations when using the Responses API statelessly (like
     *   when the `store` parameter is set to `false`, or when an organization is
     *   enrolled in the zero data retention program).
     */
    include?: Includable[] | null;
    /**
     * Whether to allow the model to run tool calls in parallel.
     * @default true
     */
    parallel_tool_calls?: boolean | null;
    /**
     * Whether to store the generated model response for later retrieval via
     * API.
     * @default true
     */
    store?: boolean | null;
    /**
     * A system (or developer) message inserted into the model's context.
     *
     * When using along with `previous_response_id`, the instructions from a previous
     * response will not be carried over to the next response. This makes it simple
     * to swap out system (or developer) messages in new responses.
     */
    instructions?: string | null;
    /**
     * If set to true, the model response data will be streamed to the client
     * as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
     * See the [Streaming section below](/docs/api-reference/responses-streaming)
     * for more information.
     * @default false
     */
    stream?: boolean | null;
  };

export interface CreateRunRequest {
  /** The ID of the [assistant](/docs/api-reference/assistants) to use to execute this run. */
  assistant_id: string;
  /**
   * The ID of the [Model](/docs/api-reference/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.
   * @example "gpt-4o"
   */
  model?: string | AssistantSupportedModels | null;
  /**
   * **o-series models only**
   *
   * Constrains effort on reasoning for
   * [reasoning models](https://platform.openai.com/docs/guides/reasoning).
   * Currently supported values are `low`, `medium`, and `high`. Reducing
   * reasoning effort can result in faster responses and fewer tokens used
   * on reasoning in a response.
   */
  reasoning_effort?: ReasoningEffort;
  /** Overrides the [instructions](/docs/api-reference/assistants/createAssistant) of the assistant. This is useful for modifying the behavior on a per-run basis. */
  instructions?: string | null;
  /** Appends additional instructions at the end of the instructions for the run. This is useful for modifying the behavior on a per-run basis without overriding other instructions. */
  additional_instructions?: string | null;
  /** Adds additional messages to the thread before creating the run. */
  additional_messages?: CreateMessageRequest[] | null;
  /**
   * Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.
   * @maxItems 20
   */
  tools?: (AssistantToolsCode | AssistantToolsFileSearch | AssistantToolsFunction)[] | null;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * @min 0
   * @max 2
   * @default 1
   * @example 1
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   * @min 0
   * @max 1
   * @default 1
   * @example 1
   */
  top_p?: number | null;
  /** If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message. */
  stream?: boolean | null;
  /**
   * The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.
   * @min 256
   */
  max_prompt_tokens?: number | null;
  /**
   * The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.
   * @min 256
   */
  max_completion_tokens?: number | null;
  truncation_strategy?: TruncationObject;
  tool_choice?: AssistantsApiToolChoiceOption;
  /** Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use. */
  parallel_tool_calls?: ParallelToolCalls;
  /**
   * Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.
   *
   * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).
   *
   * Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.
   *
   * **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.
   */
  response_format?: AssistantsApiResponseFormatOption | null;
}

export interface CreateSpeechRequest {
  /** One of the available [TTS models](/docs/models#tts): `tts-1`, `tts-1-hd` or `gpt-4o-mini-tts`. */
  model: string | "tts-1" | "tts-1-hd" | "gpt-4o-mini-tts";
  /**
   * The text to generate audio for. The maximum length is 4096 characters.
   * @maxLength 4096
   */
  input: string;
  /**
   * Control the voice of your generated audio with additional instructions. Does not work with `tts-1` or `tts-1-hd`.
   * @maxLength 4096
   */
  instructions?: string;
  /** The voice to use when generating the audio. Supported voices are `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, `shimmer`, and `verse`. Previews of the voices are available in the [Text to speech guide](/docs/guides/text-to-speech#voice-options). */
  voice: VoiceIdsShared;
  /**
   * The format to audio in. Supported formats are `mp3`, `opus`, `aac`, `flac`, `wav`, and `pcm`.
   * @default "mp3"
   */
  response_format?: "mp3" | "opus" | "aac" | "flac" | "wav" | "pcm";
  /**
   * The speed of the generated audio. Select a value from `0.25` to `4.0`. `1.0` is the default.
   * @min 0.25
   * @max 4
   * @default 1
   */
  speed?: number;
  /**
   * The format to stream the audio in. Supported formats are `sse` and `audio`. `sse` is not supported for `tts-1` or `tts-1-hd`.
   * @default "audio"
   */
  stream_format?: "sse" | "audio";
}

export type CreateSpeechResponseStreamEvent = SpeechAudioDeltaEvent | SpeechAudioDoneEvent;

export interface CreateThreadAndRunRequest {
  /** The ID of the [assistant](/docs/api-reference/assistants) to use to execute this run. */
  assistant_id: string;
  /**
   * Options to create a new thread. If no thread is provided when running a
   * request, an empty thread will be created.
   */
  thread?: CreateThreadRequest;
  /**
   * The ID of the [Model](/docs/api-reference/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.
   * @example "gpt-4o"
   */
  model?:
    | string
    | "gpt-4.1"
    | "gpt-4.1-mini"
    | "gpt-4.1-nano"
    | "gpt-4.1-2025-04-14"
    | "gpt-4.1-mini-2025-04-14"
    | "gpt-4.1-nano-2025-04-14"
    | "gpt-4o"
    | "gpt-4o-2024-11-20"
    | "gpt-4o-2024-08-06"
    | "gpt-4o-2024-05-13"
    | "gpt-4o-mini"
    | "gpt-4o-mini-2024-07-18"
    | "gpt-4.5-preview"
    | "gpt-4.5-preview-2025-02-27"
    | "gpt-4-turbo"
    | "gpt-4-turbo-2024-04-09"
    | "gpt-4-0125-preview"
    | "gpt-4-turbo-preview"
    | "gpt-4-1106-preview"
    | "gpt-4-vision-preview"
    | "gpt-4"
    | "gpt-4-0314"
    | "gpt-4-0613"
    | "gpt-4-32k"
    | "gpt-4-32k-0314"
    | "gpt-4-32k-0613"
    | "gpt-3.5-turbo"
    | "gpt-3.5-turbo-16k"
    | "gpt-3.5-turbo-0613"
    | "gpt-3.5-turbo-1106"
    | "gpt-3.5-turbo-0125"
    | "gpt-3.5-turbo-16k-0613"
    | null;
  /** Override the default system message of the assistant. This is useful for modifying the behavior on a per-run basis. */
  instructions?: string | null;
  /**
   * Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.
   * @maxItems 20
   */
  tools?: (AssistantToolsCode | AssistantToolsFileSearch | AssistantToolsFunction)[] | null;
  /** A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs. */
  tool_resources?: {
    code_interpreter?: {
      /**
       * A list of [file](/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.
       * @maxItems 20
       * @default []
       */
      file_ids?: string[];
    };
    file_search?: {
      /**
       * The ID of the [vector store](/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.
       * @maxItems 1
       */
      vector_store_ids?: string[];
    };
  } | null;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * @min 0
   * @max 2
   * @default 1
   * @example 1
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   * @min 0
   * @max 1
   * @default 1
   * @example 1
   */
  top_p?: number | null;
  /** If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message. */
  stream?: boolean | null;
  /**
   * The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.
   * @min 256
   */
  max_prompt_tokens?: number | null;
  /**
   * The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.
   * @min 256
   */
  max_completion_tokens?: number | null;
  truncation_strategy?: TruncationObject;
  tool_choice?: AssistantsApiToolChoiceOption;
  /** Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use. */
  parallel_tool_calls?: ParallelToolCalls;
  /**
   * Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.
   *
   * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).
   *
   * Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.
   *
   * **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.
   */
  response_format?: AssistantsApiResponseFormatOption | null;
}

/**
 * Options to create a new thread. If no thread is provided when running a
 * request, an empty thread will be created.
 */
export interface CreateThreadRequest {
  /** A list of [messages](/docs/api-reference/messages) to start the thread with. */
  messages?: CreateMessageRequest[];
  /** A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs. */
  tool_resources?: {
    code_interpreter?: {
      /**
       * A list of [file](/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.
       * @maxItems 20
       * @default []
       */
      file_ids?: string[];
    };
    file_search?: {
      /**
       * The [vector store](/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.
       * @maxItems 1
       */
      vector_store_ids?: string[];
      /**
       * A helper to create a [vector store](/docs/api-reference/vector-stores/object) with file_ids and attach it to this thread. There can be a maximum of 1 vector store attached to the thread.
       * @maxItems 1
       */
      vector_stores?: {
        /**
         * A list of [file](/docs/api-reference/files) IDs to add to the vector store. There can be a maximum of 10000 files in a vector store.
         * @maxItems 10000
         */
        file_ids?: string[];
        /** The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. */
        chunking_strategy?:
          | {
              /** Always `auto`. */
              type: "auto";
            }
          | {
              /** Always `static`. */
              type: "static";
              static: {
                /**
                 * The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.
                 * @min 100
                 * @max 4096
                 */
                max_chunk_size_tokens: number;
                /**
                 * The number of tokens that overlap between chunks. The default value is `400`.
                 *
                 * Note that the overlap must not exceed half of `max_chunk_size_tokens`.
                 */
                chunk_overlap_tokens: number;
              };
            };
        /**
         * Set of 16 key-value pairs that can be attached to an object. This can be
         * useful for storing additional information about the object in a structured
         * format, and querying for objects via API or the dashboard.
         *
         * Keys are strings with a maximum length of 64 characters. Values are strings
         * with a maximum length of 512 characters.
         */
        metadata?: Metadata;
      }[];
    };
  } | null;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
}

export interface CreateTranscriptionRequest {
  /**
   * The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.
   * @format binary
   */
  file: File;
  /**
   * ID of the model to use. The options are `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `whisper-1` (which is powered by our open source Whisper V2 model).
   * @example "gpt-4o-transcribe"
   */
  model: string | "whisper-1" | "gpt-4o-transcribe" | "gpt-4o-mini-transcribe";
  /** The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format will improve accuracy and latency. */
  language?: string;
  /** An optional text to guide the model's style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text#prompting) should match the audio language. */
  prompt?: string;
  /** The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, or `vtt`. For `gpt-4o-transcribe` and `gpt-4o-mini-transcribe`, the only supported format is `json`. */
  response_format?: AudioResponseFormat;
  /**
   * The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
   * @default 0
   */
  temperature?: number;
  /**
   * Additional information to include in the transcription response.
   * `logprobs` will return the log probabilities of the tokens in the
   * response to understand the model's confidence in the transcription.
   * `logprobs` only works with response_format set to `json` and only with
   * the models `gpt-4o-transcribe` and `gpt-4o-mini-transcribe`.
   */
  "include[]"?: TranscriptionInclude[];
  /**
   * The timestamp granularities to populate for this transcription. `response_format` must be set `verbose_json` to use timestamp granularities. Either or both of these options are supported: `word`, or `segment`. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.
   * @default ["segment"]
   */
  "timestamp_granularities[]"?: ("word" | "segment")[];
  /**
   * If set to true, the model response data will be streamed to the client
   * as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
   * See the [Streaming section of the Speech-to-Text guide](/docs/guides/speech-to-text?lang=curl#streaming-transcriptions)
   * for more information.
   *
   * Note: Streaming is not supported for the `whisper-1` model and will be ignored.
   * @default false
   */
  stream?: boolean | null;
  /** Controls how the audio is cut into chunks. When set to `"auto"`, the server first normalizes loudness and then uses voice activity detection (VAD) to choose boundaries. `server_vad` object can be provided to tweak VAD detection parameters manually. If unset, the audio is transcribed as a single block.  */
  chunking_strategy?: "auto" | VadConfig | null;
}

/** Represents a transcription response returned by model, based on the provided input. */
export interface CreateTranscriptionResponseJson {
  /** The transcribed text. */
  text: string;
  /** The log probabilities of the tokens in the transcription. Only returned with the models `gpt-4o-transcribe` and `gpt-4o-mini-transcribe` if `logprobs` is added to the `include` array. */
  logprobs?: {
    /** The token in the transcription. */
    token?: string;
    /** The log probability of the token. */
    logprob?: number;
    /** The bytes of the token. */
    bytes?: number[];
  }[];
  /** Token usage statistics for the request. */
  usage?: TranscriptTextUsageTokens | TranscriptTextUsageDuration;
}

export type CreateTranscriptionResponseStreamEvent = TranscriptTextDeltaEvent | TranscriptTextDoneEvent;

/** Represents a verbose json transcription response returned by model, based on the provided input. */
export interface CreateTranscriptionResponseVerboseJson {
  /** The language of the input audio. */
  language: string;
  /** The duration of the input audio. */
  duration: number;
  /** The transcribed text. */
  text: string;
  /** Extracted words and their corresponding timestamps. */
  words?: TranscriptionWord[];
  /** Segments of the transcribed text and their corresponding details. */
  segments?: TranscriptionSegment[];
  /** Usage statistics for models billed by audio input duration. */
  usage?: TranscriptTextUsageDuration;
}

export interface CreateTranslationRequest {
  /**
   * The audio file object (not file name) translate, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.
   * @format binary
   */
  file: File;
  /**
   * ID of the model to use. Only `whisper-1` (which is powered by our open source Whisper V2 model) is currently available.
   * @example "whisper-1"
   */
  model: string | "whisper-1";
  /** An optional text to guide the model's style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text#prompting) should be in English. */
  prompt?: string;
  /**
   * The format of the output, in one of these options: `json`, `text`, `srt`, `verbose_json`, or `vtt`.
   * @default "json"
   */
  response_format?: "json" | "text" | "srt" | "verbose_json" | "vtt";
  /**
   * The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
   * @default 0
   */
  temperature?: number;
}

export interface CreateTranslationResponseJson {
  text: string;
}

export interface CreateTranslationResponseVerboseJson {
  /** The language of the output translation (always `english`). */
  language: string;
  /** The duration of the input audio. */
  duration: number;
  /** The translated text. */
  text: string;
  /** Segments of the translated text and their corresponding details. */
  segments?: TranscriptionSegment[];
}

export interface CreateUploadRequest {
  /** The name of the file to upload. */
  filename: string;
  /**
   * The intended purpose of the uploaded file.
   *
   * See the [documentation on File purposes](/docs/api-reference/files/create#files-create-purpose).
   */
  purpose: "assistants" | "batch" | "fine-tune" | "vision";
  /** The number of bytes in the file you are uploading. */
  bytes: number;
  /**
   * The MIME type of the file.
   *
   * This must fall within the supported MIME types for your file purpose. See the supported MIME types for assistants and vision.
   */
  mime_type: string;
}

export interface CreateVectorStoreFileBatchRequest {
  /**
   * A list of [File](/docs/api-reference/files) IDs that the vector store should use. Useful for tools like `file_search` that can access files.
   * @maxItems 500
   * @minItems 1
   */
  file_ids: string[];
  /** The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. */
  chunking_strategy?: ChunkingStrategyRequestParam;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard. Keys are strings
   * with a maximum length of 64 characters. Values are strings with a maximum
   * length of 512 characters, booleans, or numbers.
   */
  attributes?: VectorStoreFileAttributes;
}

export interface CreateVectorStoreFileRequest {
  /** A [File](/docs/api-reference/files) ID that the vector store should use. Useful for tools like `file_search` that can access files. */
  file_id: string;
  /** The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. */
  chunking_strategy?: ChunkingStrategyRequestParam;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard. Keys are strings
   * with a maximum length of 64 characters. Values are strings with a maximum
   * length of 512 characters, booleans, or numbers.
   */
  attributes?: VectorStoreFileAttributes;
}

export interface CreateVectorStoreRequest {
  /**
   * A list of [File](/docs/api-reference/files) IDs that the vector store should use. Useful for tools like `file_search` that can access files.
   * @maxItems 500
   */
  file_ids?: string[];
  /** The name of the vector store. */
  name?: string;
  /** The expiration policy for a vector store. */
  expires_after?: VectorStoreExpirationAfter;
  /** The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. Only applicable if `file_ids` is non-empty. */
  chunking_strategy?: AutoChunkingStrategyRequestParam | StaticChunkingStrategyRequestParam;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
}

export interface DeleteAssistantResponse {
  id: string;
  deleted: boolean;
  object: "assistant.deleted";
}

export interface DeleteCertificateResponse {
  /** The object type, must be `certificate.deleted`. */
  object: "certificate.deleted";
  /** The ID of the certificate that was deleted. */
  id: string;
}

export interface DeleteFileResponse {
  id: string;
  object: "file";
  deleted: boolean;
}

export interface DeleteFineTuningCheckpointPermissionResponse {
  /** The ID of the fine-tuned model checkpoint permission that was deleted. */
  id: string;
  /** The object type, which is always "checkpoint.permission". */
  object: "checkpoint.permission";
  /** Whether the fine-tuned model checkpoint permission was successfully deleted. */
  deleted: boolean;
}

export interface DeleteMessageResponse {
  id: string;
  deleted: boolean;
  object: "thread.message.deleted";
}

export interface DeleteModelResponse {
  id: string;
  deleted: boolean;
  object: string;
}

export interface DeleteThreadResponse {
  id: string;
  deleted: boolean;
  object: "thread.deleted";
}

export interface DeleteVectorStoreFileResponse {
  id: string;
  deleted: boolean;
  object: "vector_store.file.deleted";
}

export interface DeleteVectorStoreResponse {
  id: string;
  deleted: boolean;
  object: "vector_store.deleted";
}

/** Occurs when a stream ends. */
export interface DoneEvent {
  event: "done";
  data: "[DONE]";
}

/**
 * DoubleClick
 * A double click action.
 */
export interface DoubleClick {
  /**
   * Specifies the event type. For a double click action, this property is
   * always set to `double_click`.
   * @default "double_click"
   */
  type: "double_click";
  /** The x-coordinate where the double click occurred. */
  x: number;
  /** The y-coordinate where the double click occurred. */
  y: number;
}

/**
 * Drag
 * A drag action.
 */
export interface Drag {
  /**
   * Specifies the event type. For a drag action, this property is
   * always set to `drag`.
   * @default "drag"
   */
  type: "drag";
  /**
   * An array of coordinates representing the path of the drag action. Coordinates will appear as an array
   * of objects, eg
   * ```
   * [
   *   { x: 100, y: 200 },
   *   { x: 200, y: 300 }
   * ]
   * ```
   */
  path: Coordinate[];
}

/**
 * Input message
 * A message input to the model with a role indicating instruction following
 * hierarchy. Instructions given with the `developer` or `system` role take
 * precedence over instructions given with the `user` role. Messages with the
 * `assistant` role are presumed to have been generated by the model in previous
 * interactions.
 */
export interface EasyInputMessage {
  /**
   * The role of the message input. One of `user`, `assistant`, `system`, or
   * `developer`.
   */
  role: "user" | "assistant" | "system" | "developer";
  /**
   * Text, image, or audio input to the model, used to generate a response.
   * Can also contain previous assistant responses.
   */
  content: string | InputMessageContentList;
  /** The type of the message input. Always `message`. */
  type?: "message";
}

/** Represents an embedding vector returned by embedding endpoint. */
export interface Embedding {
  /** The index of the embedding in the list of embeddings. */
  index: number;
  /** The embedding vector, which is a list of floats. The length of vector depends on the model as listed in the [embedding guide](/docs/guides/embeddings). */
  embedding: number[];
  /** The object type, which is always "embedding". */
  object: "embedding";
}

export interface Error {
  code: string | null;
  message: string;
  param: string | null;
  type: string;
}

/** Occurs when an [error](/docs/guides/error-codes#api-errors) occurs. This can happen due to an internal server error or a timeout. */
export interface ErrorEvent {
  event: "error";
  data: Error;
}

export interface ErrorResponse {
  error: Error;
}

/**
 * Eval
 * An Eval object with a data source config and testing criteria.
 * An Eval represents a task to be done for your LLM integration.
 * Like:
 *  - Improve the quality of my chatbot
 *  - See how well my chatbot handles customer support
 *  - Check if o4-mini is better at my usecase than gpt-4o
 */
export interface Eval {
  /**
   * The object type.
   * @default "eval"
   */
  object: "eval";
  /** Unique identifier for the evaluation. */
  id: string;
  /**
   * The name of the evaluation.
   * @example "Chatbot effectiveness Evaluation"
   */
  name: string;
  /** Configuration of data sources used in runs of the evaluation. */
  data_source_config: EvalCustomDataSourceConfig | EvalLogsDataSourceConfig | EvalStoredCompletionsDataSourceConfig;
  /**
   * A list of testing criteria.
   * @default "eval"
   */
  testing_criteria: (
    | EvalGraderLabelModel
    | EvalGraderStringCheck
    | EvalGraderTextSimilarity
    | EvalGraderPython
    | EvalGraderScoreModel
  )[];
  /** The Unix timestamp (in seconds) for when the eval was created. */
  created_at: number;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Metadata;
}

/**
 * EvalApiError
 * An object representing an error response from the Eval API.
 */
export interface EvalApiError {
  /** The error code. */
  code: string;
  /** The error message. */
  message: string;
}

/**
 * CustomDataSourceConfig
 * A CustomDataSourceConfig which specifies the schema of your `item` and optionally `sample` namespaces.
 * The response schema defines the shape of the data that will be:
 * - Used to define your testing criteria and
 * - What data is required when creating a run
 */
export interface EvalCustomDataSourceConfig {
  /**
   * The type of data source. Always `custom`.
   * @default "custom"
   */
  type: "custom";
  /**
   * The json schema for the run data source items.
   * Learn how to build JSON schemas [here](https://json-schema.org/).
   * @example "{
   *   "type": "object",
   *   "properties": {
   *     "item": {
   *       "type": "object",
   *       "properties": {
   *         "label": {"type": "string"},
   *       },
   *       "required": ["label"]
   *     }
   *   },
   *   "required": ["item"]
   * }
   * "
   */
  schema: Record<string, any>;
}

/** LabelModelGrader */
export type EvalGraderLabelModel = GraderLabelModel;

/** PythonGrader */
export type EvalGraderPython = GraderPython & {
  /** The threshold for the score. */
  pass_threshold?: number;
};

/** ScoreModelGrader */
export type EvalGraderScoreModel = GraderScoreModel & {
  /** The threshold for the score. */
  pass_threshold?: number;
};

/** StringCheckGrader */
export type EvalGraderStringCheck = GraderStringCheck;

/** TextSimilarityGrader */
export type EvalGraderTextSimilarity = GraderTextSimilarity & {
  /** The threshold for the score. */
  pass_threshold: number;
};

/**
 * Eval message object
 * A message input to the model with a role indicating instruction following
 * hierarchy. Instructions given with the `developer` or `system` role take
 * precedence over instructions given with the `user` role. Messages with the
 * `assistant` role are presumed to have been generated by the model in previous
 * interactions.
 */
export interface EvalItem {
  /**
   * The role of the message input. One of `user`, `assistant`, `system`, or
   * `developer`.
   */
  role: "user" | "assistant" | "system" | "developer";
  /** Text inputs to the model - can contain template strings. */
  content:
    | string
    | InputTextContent
    | {
        /** The type of the output text. Always `output_text`. */
        type: "output_text";
        /** The text output from the model. */
        text: string;
      };
  /** The type of the message input. Always `message`. */
  type?: "message";
}

/** EvalJsonlFileContentSource */
export interface EvalJsonlFileContentSource {
  /**
   * The type of jsonl source. Always `file_content`.
   * @default "file_content"
   */
  type: "file_content";
  /** The content of the jsonl file. */
  content: {
    item: Record<string, any>;
    sample?: Record<string, any>;
  }[];
}

/** EvalJsonlFileIdSource */
export interface EvalJsonlFileIdSource {
  /**
   * The type of jsonl source. Always `file_id`.
   * @default "file_id"
   */
  type: "file_id";
  /** The identifier of the file. */
  id: string;
}

/**
 * EvalList
 * An object representing a list of evals.
 */
export interface EvalList {
  /**
   * The type of this object. It is always set to "list".
   * @default "list"
   */
  object: "list";
  /** An array of eval objects. */
  data: Eval[];
  /** The identifier of the first eval in the data array. */
  first_id: string;
  /** The identifier of the last eval in the data array. */
  last_id: string;
  /** Indicates whether there are more evals available. */
  has_more: boolean;
}

/**
 * LogsDataSourceConfig
 * A LogsDataSourceConfig which specifies the metadata property of your logs query.
 * This is usually metadata like `usecase=chatbot` or `prompt-version=v2`, etc.
 * The schema returned by this data source config is used to defined what variables are available in your evals.
 * `item` and `sample` are both defined when using this data source config.
 */
export interface EvalLogsDataSourceConfig {
  /**
   * The type of data source. Always `logs`.
   * @default "logs"
   */
  type: "logs";
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
  /**
   * The json schema for the run data source items.
   * Learn how to build JSON schemas [here](https://json-schema.org/).
   */
  schema: Record<string, any>;
}

/**
 * EvalResponsesSource
 * A EvalResponsesSource object describing a run data source configuration.
 */
export interface EvalResponsesSource {
  /** The type of run data source. Always `responses`. */
  type: "responses";
  /** Metadata filter for the responses. This is a query parameter used to select responses. */
  metadata?: object | null;
  /** The name of the model to find responses for. This is a query parameter used to select responses. */
  model?: string | null;
  /** Optional string to search the 'instructions' field. This is a query parameter used to select responses. */
  instructions_search?: string | null;
  /**
   * Only include items created after this timestamp (inclusive). This is a query parameter used to select responses.
   * @min 0
   */
  created_after?: number | null;
  /**
   * Only include items created before this timestamp (inclusive). This is a query parameter used to select responses.
   * @min 0
   */
  created_before?: number | null;
  /** Optional reasoning effort parameter. This is a query parameter used to select responses. */
  reasoning_effort?: ReasoningEffort | null;
  /** Sampling temperature. This is a query parameter used to select responses. */
  temperature?: number | null;
  /** Nucleus sampling parameter. This is a query parameter used to select responses. */
  top_p?: number | null;
  /** List of user identifiers. This is a query parameter used to select responses. */
  users?: string[] | null;
  /** List of tool names. This is a query parameter used to select responses. */
  tools?: string[] | null;
}

/**
 * EvalRun
 * A schema representing an evaluation run.
 */
export interface EvalRun {
  /**
   * The type of the object. Always "eval.run".
   * @default "eval.run"
   */
  object: "eval.run";
  /** Unique identifier for the evaluation run. */
  id: string;
  /** The identifier of the associated evaluation. */
  eval_id: string;
  /** The status of the evaluation run. */
  status: string;
  /** The model that is evaluated, if applicable. */
  model: string;
  /** The name of the evaluation run. */
  name: string;
  /** Unix timestamp (in seconds) when the evaluation run was created. */
  created_at: number;
  /** The URL to the rendered evaluation run report on the UI dashboard. */
  report_url: string;
  /** Counters summarizing the outcomes of the evaluation run. */
  result_counts: {
    /** Total number of executed output items. */
    total: number;
    /** Number of output items that resulted in an error. */
    errored: number;
    /** Number of output items that failed to pass the evaluation. */
    failed: number;
    /** Number of output items that passed the evaluation. */
    passed: number;
  };
  /** Usage statistics for each model during the evaluation run. */
  per_model_usage: {
    /** The name of the model. */
    model_name: string;
    /** The number of invocations. */
    invocation_count: number;
    /** The number of prompt tokens used. */
    prompt_tokens: number;
    /** The number of completion tokens generated. */
    completion_tokens: number;
    /** The total number of tokens used. */
    total_tokens: number;
    /** The number of tokens retrieved from cache. */
    cached_tokens: number;
  }[];
  /** Results per testing criteria applied during the evaluation run. */
  per_testing_criteria_results: {
    /** A description of the testing criteria. */
    testing_criteria: string;
    /** Number of tests passed for this criteria. */
    passed: number;
    /** Number of tests failed for this criteria. */
    failed: number;
  }[];
  /** Information about the run's data source. */
  data_source: CreateEvalJsonlRunDataSource | CreateEvalCompletionsRunDataSource | CreateEvalResponsesRunDataSource;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Metadata;
  /** An object representing an error response from the Eval API. */
  error: EvalApiError;
}

/**
 * EvalRunList
 * An object representing a list of runs for an evaluation.
 */
export interface EvalRunList {
  /**
   * The type of this object. It is always set to "list".
   * @default "list"
   */
  object: "list";
  /** An array of eval run objects. */
  data: EvalRun[];
  /** The identifier of the first eval run in the data array. */
  first_id: string;
  /** The identifier of the last eval run in the data array. */
  last_id: string;
  /** Indicates whether there are more evals available. */
  has_more: boolean;
}

/**
 * EvalRunOutputItem
 * A schema representing an evaluation run output item.
 */
export interface EvalRunOutputItem {
  /**
   * The type of the object. Always "eval.run.output_item".
   * @default "eval.run.output_item"
   */
  object: "eval.run.output_item";
  /** Unique identifier for the evaluation run output item. */
  id: string;
  /** The identifier of the evaluation run associated with this output item. */
  run_id: string;
  /** The identifier of the evaluation group. */
  eval_id: string;
  /** Unix timestamp (in seconds) when the evaluation run was created. */
  created_at: number;
  /** The status of the evaluation run. */
  status: string;
  /** The identifier for the data source item. */
  datasource_item_id: number;
  /** Details of the input data source item. */
  datasource_item: Record<string, any>;
  /** A list of results from the evaluation run. */
  results: Record<string, any>[];
  /** A sample containing the input and output of the evaluation run. */
  sample: {
    /** An array of input messages. */
    input: {
      /** The role of the message sender (e.g., system, user, developer). */
      role: string;
      /** The content of the message. */
      content: string;
    }[];
    /** An array of output messages. */
    output: {
      /** The role of the message (e.g. "system", "assistant", "user"). */
      role?: string;
      /** The content of the message. */
      content?: string;
    }[];
    /** The reason why the sample generation was finished. */
    finish_reason: string;
    /** The model used for generating the sample. */
    model: string;
    /** Token usage details for the sample. */
    usage: {
      /** The total number of tokens used. */
      total_tokens: number;
      /** The number of completion tokens generated. */
      completion_tokens: number;
      /** The number of prompt tokens used. */
      prompt_tokens: number;
      /** The number of tokens retrieved from cache. */
      cached_tokens: number;
    };
    /** An object representing an error response from the Eval API. */
    error: EvalApiError;
    /** The sampling temperature used. */
    temperature: number;
    /** The maximum number of tokens allowed for completion. */
    max_completion_tokens: number;
    /** The top_p value used for sampling. */
    top_p: number;
    /** The seed used for generating the sample. */
    seed: number;
  };
}

/**
 * EvalRunOutputItemList
 * An object representing a list of output items for an evaluation run.
 */
export interface EvalRunOutputItemList {
  /**
   * The type of this object. It is always set to "list".
   * @default "list"
   */
  object: "list";
  /** An array of eval run output item objects. */
  data: EvalRunOutputItem[];
  /** The identifier of the first eval run output item in the data array. */
  first_id: string;
  /** The identifier of the last eval run output item in the data array. */
  last_id: string;
  /** Indicates whether there are more eval run output items available. */
  has_more: boolean;
}

/**
 * StoredCompletionsDataSourceConfig
 * Deprecated in favor of LogsDataSourceConfig.
 * @deprecated
 */
export interface EvalStoredCompletionsDataSourceConfig {
  /**
   * The type of data source. Always `stored_completions`.
   * @default "stored_completions"
   */
  type: "stored_completions";
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
  /**
   * The json schema for the run data source items.
   * Learn how to build JSON schemas [here](https://json-schema.org/).
   */
  schema: Record<string, any>;
}

/**
 * StoredCompletionsRunDataSource
 * A StoredCompletionsRunDataSource configuration describing a set of filters
 */
export interface EvalStoredCompletionsSource {
  /**
   * The type of source. Always `stored_completions`.
   * @default "stored_completions"
   */
  type: "stored_completions";
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
  /** An optional model to filter by (e.g., 'gpt-4o'). */
  model?: string | null;
  /** An optional Unix timestamp to filter items created after this time. */
  created_after?: number | null;
  /** An optional Unix timestamp to filter items created before this time. */
  created_before?: number | null;
  /** An optional maximum number of items to return. */
  limit?: number | null;
}

/**
 * File path
 * A path to a file.
 */
export interface FilePath {
  /** The type of the file path. Always `file_path`. */
  type: "file_path";
  /** The ID of the file. */
  file_id: string;
  /** The index of the file in the list of files. */
  index: number;
}

/** The ranker to use for the file search. If not specified will use the `auto` ranker. */
export type FileSearchRanker = "auto" | "default_2024_08_21";

/**
 * File search tool call ranking options
 * The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.
 *
 * See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.
 */
export interface FileSearchRankingOptions {
  /** The ranker to use for the file search. If not specified will use the `auto` ranker. */
  ranker?: FileSearchRanker;
  /**
   * The score threshold for the file search. All values must be a floating point number between 0 and 1.
   * @min 0
   * @max 1
   */
  score_threshold: number;
}

/**
 * File search tool call
 * The results of a file search tool call. See the
 * [file search guide](/docs/guides/tools-file-search) for more information.
 */
export interface FileSearchToolCall {
  /** The unique ID of the file search tool call. */
  id: string;
  /** The type of the file search tool call. Always `file_search_call`. */
  type: "file_search_call";
  /**
   * The status of the file search tool call. One of `in_progress`,
   * `searching`, `incomplete` or `failed`,
   */
  status: "in_progress" | "searching" | "completed" | "incomplete" | "failed";
  /** The queries used to search for files. */
  queries: string[];
  /** The results of the file search tool call. */
  results?:
    | {
        /** The unique ID of the file. */
        file_id?: string;
        /** The text that was retrieved from the file. */
        text?: string;
        /** The name of the file. */
        filename?: string;
        /**
         * Set of 16 key-value pairs that can be attached to an object. This can be
         * useful for storing additional information about the object in a structured
         * format, and querying for objects via API or the dashboard. Keys are strings
         * with a maximum length of 64 characters. Values are strings with a maximum
         * length of 512 characters, booleans, or numbers.
         */
        attributes?: VectorStoreFileAttributes;
        /**
         * The relevance score of the file - a value between 0 and 1.
         * @format float
         */
        score?: number;
      }[]
    | null;
}

export type FineTuneChatCompletionRequestAssistantMessage = {
  /** Controls whether the assistant message is trained against (0 or 1) */
  weight?: 0 | 1;
} & UtilRequiredKeys<ChatCompletionRequestAssistantMessage, "role">;

/**
 * The per-line training example of a fine-tuning input file for chat models using the supervised method.
 * Input messages may contain text or image content only. Audio and file input messages
 * are not currently supported for fine-tuning.
 */
export interface FineTuneChatRequestInput {
  /** @minItems 1 */
  messages?: (
    | ChatCompletionRequestSystemMessage
    | ChatCompletionRequestUserMessage
    | FineTuneChatCompletionRequestAssistantMessage
    | ChatCompletionRequestToolMessage
    | ChatCompletionRequestFunctionMessage
  )[];
  /** A list of tools the model may generate JSON inputs for. */
  tools?: ChatCompletionTool[];
  /** Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use. */
  parallel_tool_calls?: ParallelToolCalls;
  /**
   * A list of functions the model may generate JSON inputs for.
   * @deprecated
   * @maxItems 128
   * @minItems 1
   */
  functions?: ChatCompletionFunctions[];
}

/** The hyperparameters used for the DPO fine-tuning job. */
export interface FineTuneDPOHyperparameters {
  /**
   * The beta value for the DPO method. A higher beta value will increase the weight of the penalty between the policy and reference model.
   * @default "auto"
   */
  beta?: "auto" | number;
  /**
   * Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.
   * @default "auto"
   */
  batch_size?: "auto" | number;
  /**
   * Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.
   * @default "auto"
   */
  learning_rate_multiplier?: "auto" | number;
  /**
   * The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.
   * @default "auto"
   */
  n_epochs?: "auto" | number;
}

/** Configuration for the DPO fine-tuning method. */
export interface FineTuneDPOMethod {
  /** The hyperparameters used for the DPO fine-tuning job. */
  hyperparameters?: FineTuneDPOHyperparameters;
}

/** The method used for fine-tuning. */
export interface FineTuneMethod {
  /** The type of method. Is either `supervised`, `dpo`, or `reinforcement`. */
  type: "supervised" | "dpo" | "reinforcement";
  /** Configuration for the supervised fine-tuning method. */
  supervised?: FineTuneSupervisedMethod;
  /** Configuration for the DPO fine-tuning method. */
  dpo?: FineTuneDPOMethod;
  /** Configuration for the reinforcement fine-tuning method. */
  reinforcement?: FineTuneReinforcementMethod;
}

/**
 * The per-line training example of a fine-tuning input file for chat models using the dpo method.
 * Input messages may contain text or image content only. Audio and file input messages
 * are not currently supported for fine-tuning.
 */
export interface FineTunePreferenceRequestInput {
  input?: {
    /** @minItems 1 */
    messages?: (
      | ChatCompletionRequestSystemMessage
      | ChatCompletionRequestUserMessage
      | FineTuneChatCompletionRequestAssistantMessage
      | ChatCompletionRequestToolMessage
      | ChatCompletionRequestFunctionMessage
    )[];
    /** A list of tools the model may generate JSON inputs for. */
    tools?: ChatCompletionTool[];
    /** Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use. */
    parallel_tool_calls?: ParallelToolCalls;
  };
  /**
   * The preferred completion message for the output.
   * @maxItems 1
   */
  preferred_output?: ChatCompletionRequestAssistantMessage[];
  /**
   * The non-preferred completion message for the output.
   * @maxItems 1
   */
  non_preferred_output?: ChatCompletionRequestAssistantMessage[];
}

/** The hyperparameters used for the reinforcement fine-tuning job. */
export interface FineTuneReinforcementHyperparameters {
  /**
   * Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.
   * @default "auto"
   */
  batch_size?: "auto" | number;
  /**
   * Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.
   * @default "auto"
   */
  learning_rate_multiplier?: "auto" | number;
  /**
   * The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.
   * @default "auto"
   */
  n_epochs?: "auto" | number;
  /**
   * Level of reasoning effort.
   * @default "default"
   */
  reasoning_effort?: "default" | "low" | "medium" | "high";
  /**
   * Multiplier on amount of compute used for exploring search space during training.
   * @default "auto"
   */
  compute_multiplier?: "auto" | number;
  /**
   * The number of training steps between evaluation runs.
   * @default "auto"
   */
  eval_interval?: "auto" | number;
  /**
   * Number of evaluation samples to generate per training step.
   * @default "auto"
   */
  eval_samples?: "auto" | number;
}

/** Configuration for the reinforcement fine-tuning method. */
export interface FineTuneReinforcementMethod {
  /** The grader used for the fine-tuning job. */
  grader: GraderStringCheck | GraderTextSimilarity | GraderPython | GraderScoreModel | GraderMulti;
  /** The hyperparameters used for the reinforcement fine-tuning job. */
  hyperparameters?: FineTuneReinforcementHyperparameters;
}

/**
 * Per-line training example for reinforcement fine-tuning. Note that `messages` and `tools` are the only reserved keywords.
 * Any other arbitrary key-value data can be included on training datapoints and will be available to reference during grading under the `{{ item.XXX }}` template variable.
 * Input messages may contain text or image content only. Audio and file input messages
 * are not currently supported for fine-tuning.
 */
export interface FineTuneReinforcementRequestInput {
  /** @minItems 1 */
  messages: (
    | ChatCompletionRequestDeveloperMessage
    | ChatCompletionRequestUserMessage
    | FineTuneChatCompletionRequestAssistantMessage
    | ChatCompletionRequestToolMessage
  )[];
  /** A list of tools the model may generate JSON inputs for. */
  tools?: ChatCompletionTool[];
}

/** The hyperparameters used for the fine-tuning job. */
export interface FineTuneSupervisedHyperparameters {
  /**
   * Number of examples in each batch. A larger batch size means that model parameters are updated less frequently, but with lower variance.
   * @default "auto"
   */
  batch_size?: "auto" | number;
  /**
   * Scaling factor for the learning rate. A smaller learning rate may be useful to avoid overfitting.
   * @default "auto"
   */
  learning_rate_multiplier?: "auto" | number;
  /**
   * The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.
   * @default "auto"
   */
  n_epochs?: "auto" | number;
}

/** Configuration for the supervised fine-tuning method. */
export interface FineTuneSupervisedMethod {
  /** The hyperparameters used for the fine-tuning job. */
  hyperparameters?: FineTuneSupervisedHyperparameters;
}

/**
 * FineTuningCheckpointPermission
 * The `checkpoint.permission` object represents a permission for a fine-tuned model checkpoint.
 */
export interface FineTuningCheckpointPermission {
  /** The permission identifier, which can be referenced in the API endpoints. */
  id: string;
  /** The Unix timestamp (in seconds) for when the permission was created. */
  created_at: number;
  /** The project identifier that the permission is for. */
  project_id: string;
  /** The object type, which is always "checkpoint.permission". */
  object: "checkpoint.permission";
}

/** Fine-Tuning Job Integration */
export interface FineTuningIntegration {
  /** The type of the integration being enabled for the fine-tuning job */
  type: "wandb";
  /**
   * The settings for your integration with Weights and Biases. This payload specifies the project that
   * metrics will be sent to. Optionally, you can set an explicit display name for your run, add tags
   * to your run, and set a default entity (team, username, etc) to be associated with your run.
   */
  wandb: {
    /**
     * The name of the project that the new run will be created under.
     * @example "my-wandb-project"
     */
    project: string;
    /** A display name to set for the run. If not set, we will use the Job ID as the name. */
    name?: string | null;
    /**
     * The entity to use for the run. This allows you to set the team or username of the WandB user that you would
     * like associated with the run. If not set, the default entity for the registered WandB API key is used.
     */
    entity?: string | null;
    /**
     * A list of tags to be attached to the newly created run. These tags are passed through directly to WandB. Some
     * default tags are generated by OpenAI: "openai/finetune", "openai/{base-model}", "openai/{ftjob-abcdef}".
     */
    tags?: string[];
  };
}

/**
 * FineTuningJob
 * The `fine_tuning.job` object represents a fine-tuning job that has been created through the API.
 */
export interface FineTuningJob {
  /** The object identifier, which can be referenced in the API endpoints. */
  id: string;
  /** The Unix timestamp (in seconds) for when the fine-tuning job was created. */
  created_at: number;
  /** For fine-tuning jobs that have `failed`, this will contain more information on the cause of the failure. */
  error: {
    /** A machine-readable error code. */
    code: string;
    /** A human-readable error message. */
    message: string;
    /** The parameter that was invalid, usually `training_file` or `validation_file`. This field will be null if the failure was not parameter-specific. */
    param: string | null;
  };
  /** The name of the fine-tuned model that is being created. The value will be null if the fine-tuning job is still running. */
  fine_tuned_model: string | null;
  /** The Unix timestamp (in seconds) for when the fine-tuning job was finished. The value will be null if the fine-tuning job is still running. */
  finished_at: number | null;
  /** The hyperparameters used for the fine-tuning job. This value will only be returned when running `supervised` jobs. */
  hyperparameters: {
    /**
     * Number of examples in each batch. A larger batch size means that model parameters
     * are updated less frequently, but with lower variance.
     * @default "auto"
     */
    batch_size?: "auto" | number | null;
    /**
     * Scaling factor for the learning rate. A smaller learning rate may be useful to avoid
     * overfitting.
     * @default "auto"
     */
    learning_rate_multiplier?: "auto" | number;
    /**
     * The number of epochs to train the model for. An epoch refers to one full cycle
     * through the training dataset.
     * @default "auto"
     */
    n_epochs?: "auto" | number;
  };
  /** The base model that is being fine-tuned. */
  model: string;
  /** The object type, which is always "fine_tuning.job". */
  object: "fine_tuning.job";
  /** The organization that owns the fine-tuning job. */
  organization_id: string;
  /** The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the [Files API](/docs/api-reference/files/retrieve-contents). */
  result_files: string[];
  /** The current status of the fine-tuning job, which can be either `validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`. */
  status: "validating_files" | "queued" | "running" | "succeeded" | "failed" | "cancelled";
  /** The total number of billable tokens processed by this fine-tuning job. The value will be null if the fine-tuning job is still running. */
  trained_tokens: number | null;
  /** The file ID used for training. You can retrieve the training data with the [Files API](/docs/api-reference/files/retrieve-contents). */
  training_file: string;
  /** The file ID used for validation. You can retrieve the validation results with the [Files API](/docs/api-reference/files/retrieve-contents). */
  validation_file: string | null;
  /**
   * A list of integrations to enable for this fine-tuning job.
   * @maxItems 5
   */
  integrations?: FineTuningIntegration[] | null;
  /** The seed used for the fine-tuning job. */
  seed: number;
  /** The Unix timestamp (in seconds) for when the fine-tuning job is estimated to finish. The value will be null if the fine-tuning job is not running. */
  estimated_finish?: number | null;
  /** The method used for fine-tuning. */
  method?: FineTuneMethod;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
}

/**
 * FineTuningJobCheckpoint
 * The `fine_tuning.job.checkpoint` object represents a model checkpoint for a fine-tuning job that is ready to use.
 */
export interface FineTuningJobCheckpoint {
  /** The checkpoint identifier, which can be referenced in the API endpoints. */
  id: string;
  /** The Unix timestamp (in seconds) for when the checkpoint was created. */
  created_at: number;
  /** The name of the fine-tuned checkpoint model that is created. */
  fine_tuned_model_checkpoint: string;
  /** The step number that the checkpoint was created at. */
  step_number: number;
  /** Metrics at the step number during the fine-tuning job. */
  metrics: {
    step?: number;
    train_loss?: number;
    train_mean_token_accuracy?: number;
    valid_loss?: number;
    valid_mean_token_accuracy?: number;
    full_valid_loss?: number;
    full_valid_mean_token_accuracy?: number;
  };
  /** The name of the fine-tuning job that this checkpoint was created from. */
  fine_tuning_job_id: string;
  /** The object type, which is always "fine_tuning.job.checkpoint". */
  object: "fine_tuning.job.checkpoint";
}

/** Fine-tuning job event object */
export interface FineTuningJobEvent {
  /** The object type, which is always "fine_tuning.job.event". */
  object: "fine_tuning.job.event";
  /** The object identifier. */
  id: string;
  /** The Unix timestamp (in seconds) for when the fine-tuning job was created. */
  created_at: number;
  /** The log level of the event. */
  level: "info" | "warn" | "error";
  /** The message of the event. */
  message: string;
  /** The type of event. */
  type?: "message" | "metrics";
  /** The data associated with the event. */
  data?: object;
}

export interface FunctionObject {
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64. */
  name: string;
  /**
   * The parameters the functions accepts, described as a JSON Schema object. See the [guide](/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.
   *
   * Omitting `parameters` defines a function with an empty parameter list.
   */
  parameters?: FunctionParameters;
  /**
   * Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](docs/guides/function-calling).
   * @default false
   */
  strict?: boolean | null;
}

/**
 * The parameters the functions accepts, described as a JSON Schema object. See the [guide](/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.
 *
 * Omitting `parameters` defines a function with an empty parameter list.
 */
export type FunctionParameters = Record<string, any>;

/**
 * Function tool call
 * A tool call to run a function. See the
 * [function calling guide](/docs/guides/function-calling) for more information.
 */
export interface FunctionToolCall {
  /** The unique ID of the function tool call. */
  id?: string;
  /** The type of the function tool call. Always `function_call`. */
  type: "function_call";
  /** The unique ID of the function tool call generated by the model. */
  call_id: string;
  /** The name of the function to run. */
  name: string;
  /** A JSON string of the arguments to pass to the function. */
  arguments: string;
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   * `incomplete`. Populated when items are returned via API.
   */
  status?: "in_progress" | "completed" | "incomplete";
}

/**
 * Function tool call output
 * The output of a function tool call.
 */
export interface FunctionToolCallOutput {
  /**
   * The unique ID of the function tool call output. Populated when this item
   * is returned via API.
   */
  id?: string;
  /** The type of the function tool call output. Always `function_call_output`. */
  type: "function_call_output";
  /** The unique ID of the function tool call generated by the model. */
  call_id: string;
  /** A JSON string of the output of the function tool call. */
  output: string;
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   * `incomplete`. Populated when items are returned via API.
   */
  status?: "in_progress" | "completed" | "incomplete";
}

export type FunctionToolCallOutputResource = FunctionToolCallOutput & {
  /** The unique ID of the function call tool output. */
  id: string;
};

export type FunctionToolCallResource = FunctionToolCall & {
  /** The unique ID of the function tool call. */
  id: string;
};

/**
 * LabelModelGrader
 * A LabelModelGrader object which uses a model to assign labels to each item
 * in the evaluation.
 */
export interface GraderLabelModel {
  /** The object type, which is always `label_model`. */
  type: "label_model";
  /** The name of the grader. */
  name: string;
  /** The model to use for the evaluation. Must support structured outputs. */
  model: string;
  input: EvalItem[];
  /** The labels to assign to each item in the evaluation. */
  labels: string[];
  /** The labels that indicate a passing result. Must be a subset of labels. */
  passing_labels: string[];
}

/**
 * MultiGrader
 * A MultiGrader object combines the output of multiple graders to produce a single score.
 */
export interface GraderMulti {
  /**
   * The object type, which is always `multi`.
   * @default "multi"
   */
  type: "multi";
  /** The name of the grader. */
  name: string;
  graders: GraderStringCheck | GraderTextSimilarity | GraderPython | GraderScoreModel | GraderLabelModel;
  /** A formula to calculate the output based on grader results. */
  calculate_output: string;
}

/**
 * PythonGrader
 * A PythonGrader object that runs a python script on the input.
 */
export interface GraderPython {
  /** The object type, which is always `python`. */
  type: "python";
  /** The name of the grader. */
  name: string;
  /** The source code of the python script. */
  source: string;
  /** The image tag to use for the python script. */
  image_tag?: string;
}

/**
 * ScoreModelGrader
 * A ScoreModelGrader object that uses a model to assign a score to the input.
 */
export interface GraderScoreModel {
  /** The object type, which is always `score_model`. */
  type: "score_model";
  /** The name of the grader. */
  name: string;
  /** The model to use for the evaluation. */
  model: string;
  /** The sampling parameters for the model. */
  sampling_params?: object;
  /** The input text. This may include template strings. */
  input: EvalItem[];
  /** The range of the score. Defaults to `[0, 1]`. */
  range?: number[];
}

/**
 * StringCheckGrader
 * A StringCheckGrader object that performs a string comparison between input and reference using a specified operation.
 */
export interface GraderStringCheck {
  /** The object type, which is always `string_check`. */
  type: "string_check";
  /** The name of the grader. */
  name: string;
  /** The input text. This may include template strings. */
  input: string;
  /** The reference text. This may include template strings. */
  reference: string;
  /** The string check operation to perform. One of `eq`, `ne`, `like`, or `ilike`. */
  operation: "eq" | "ne" | "like" | "ilike";
}

/**
 * TextSimilarityGrader
 * A TextSimilarityGrader object which grades text based on similarity metrics.
 */
export interface GraderTextSimilarity {
  /**
   * The type of grader.
   * @default "text_similarity"
   */
  type: "text_similarity";
  /** The name of the grader. */
  name: string;
  /** The text being graded. */
  input: string;
  /** The text being graded against. */
  reference: string;
  /** The evaluation metric to use. One of `fuzzy_match`, `bleu`, `gleu`, `meteor`, `rouge_1`, `rouge_2`, `rouge_3`, `rouge_4`, `rouge_5`, or `rouge_l`. */
  evaluation_metric:
    | "fuzzy_match"
    | "bleu"
    | "gleu"
    | "meteor"
    | "rouge_1"
    | "rouge_2"
    | "rouge_3"
    | "rouge_4"
    | "rouge_5"
    | "rouge_l";
}

/** Represents the content or the URL of an image generated by the OpenAI API. */
export interface Image {
  /** The base64-encoded JSON of the generated image. Default value for `gpt-image-1`, and only present if `response_format` is set to `b64_json` for `dall-e-2` and `dall-e-3`. */
  b64_json?: string;
  /** When using `dall-e-2` or `dall-e-3`, the URL of the generated image if `response_format` is set to `url` (default value). Unsupported for `gpt-image-1`. */
  url?: string;
  /** For `dall-e-3` only, the revised prompt that was used to generate the image. */
  revised_prompt?: string;
}

/**
 * Image generation tool
 * A tool that generates images using a model like `gpt-image-1`.
 */
export interface ImageGenTool {
  /** The type of the image generation tool. Always `image_generation`. */
  type: "image_generation";
  /**
   * The image generation model to use. Default: `gpt-image-1`.
   * @default "gpt-image-1"
   */
  model?: "gpt-image-1";
  /**
   * The quality of the generated image. One of `low`, `medium`, `high`,
   * or `auto`. Default: `auto`.
   * @default "auto"
   */
  quality?: "low" | "medium" | "high" | "auto";
  /**
   * The size of the generated image. One of `1024x1024`, `1024x1536`,
   * `1536x1024`, or `auto`. Default: `auto`.
   * @default "auto"
   */
  size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto";
  /**
   * The output format of the generated image. One of `png`, `webp`, or
   * `jpeg`. Default: `png`.
   * @default "png"
   */
  output_format?: "png" | "webp" | "jpeg";
  /**
   * Compression level for the output image. Default: 100.
   * @min 0
   * @max 100
   * @default 100
   */
  output_compression?: number;
  /**
   * Moderation level for the generated image. Default: `auto`.
   * @default "auto"
   */
  moderation?: "auto" | "low";
  /**
   * Background type for the generated image. One of `transparent`,
   * `opaque`, or `auto`. Default: `auto`.
   * @default "auto"
   */
  background?: "transparent" | "opaque" | "auto";
  /**
   * Optional mask for inpainting. Contains `image_url`
   * (string, optional) and `file_id` (string, optional).
   */
  input_image_mask?: {
    /** Base64-encoded mask image. */
    image_url?: string;
    /** File ID for the mask image. */
    file_id?: string;
  };
  /**
   * Number of partial images to generate in streaming mode, from 0 (default value) to 3.
   * @min 0
   * @max 3
   * @default 0
   */
  partial_images?: number;
}

/**
 * Image generation call
 * An image generation request made by the model.
 */
export interface ImageGenToolCall {
  /** The type of the image generation call. Always `image_generation_call`. */
  type: "image_generation_call";
  /** The unique ID of the image generation call. */
  id: string;
  /** The status of the image generation call. */
  status: "in_progress" | "completed" | "generating" | "failed";
  /** The generated image encoded in base64. */
  result: string | null;
}

/**
 * Image generation response
 * The response from the image generation endpoint.
 */
export interface ImagesResponse {
  /** The Unix timestamp (in seconds) of when the image was created. */
  created: number;
  /** The list of generated images. */
  data?: Image[];
  /** The background parameter used for the image generation. Either `transparent` or `opaque`. */
  background?: "transparent" | "opaque";
  /** The output format of the image generation. Either `png`, `webp`, or `jpeg`. */
  output_format?: "png" | "webp" | "jpeg";
  /** The size of the image generated. Either `1024x1024`, `1024x1536`, or `1536x1024`. */
  size?: "1024x1024" | "1024x1536" | "1536x1024";
  /** The quality of the image generated. Either `low`, `medium`, or `high`. */
  quality?: "low" | "medium" | "high";
  /** For `gpt-image-1` only, the token usage information for the image generation. */
  usage?: {
    /** The total number of tokens (images and text) used for the image generation. */
    total_tokens: number;
    /** The number of tokens (images and text) in the input prompt. */
    input_tokens: number;
    /** The number of image tokens in the output image. */
    output_tokens: number;
    /** The input tokens detailed information for the image generation. */
    input_tokens_details: {
      /** The number of text tokens in the input prompt. */
      text_tokens: number;
      /** The number of image tokens in the input prompt. */
      image_tokens: number;
    };
  };
}

/**
 * Specify additional output data to include in the model response. Currently
 * supported values are:
 * - `code_interpreter_call.outputs`: Includes the outputs of python code execution
 *   in code interpreter tool call items.
 * - `computer_call_output.output.image_url`: Include image urls from the computer call output.
 * - `file_search_call.results`: Include the search results of
 *   the file search tool call.
 * - `message.input_image.image_url`: Include image urls from the input message.
 * - `message.output_text.logprobs`: Include logprobs with assistant messages.
 * - `reasoning.encrypted_content`: Includes an encrypted version of reasoning
 *   tokens in reasoning item outputs. This enables reasoning items to be used in
 *   multi-turn conversations when using the Responses API statelessly (like
 *   when the `store` parameter is set to `false`, or when an organization is
 *   enrolled in the zero data retention program).
 */
export type Includable =
  | "code_interpreter_call.outputs"
  | "computer_call_output.output.image_url"
  | "file_search_call.results"
  | "message.input_image.image_url"
  | "message.output_text.logprobs"
  | "reasoning.encrypted_content";

/**
 * Audio input
 * An audio input to the model.
 */
export interface InputAudio {
  /** The type of the input item. Always `input_audio`. */
  type: "input_audio";
  /** Base64-encoded audio data. */
  data: string;
  /**
   * The format of the audio data. Currently supported formats are `mp3` and
   * `wav`.
   */
  format: "mp3" | "wav";
}

export type InputContent = InputTextContent | InputImageContent | InputFileContent;

/**
 * An item representing part of the context for the response to be
 * generated by the model. Can contain text, images, and audio inputs,
 * as well as previous assistant responses and tool call outputs.
 */
export type InputItem = EasyInputMessage | Item | ItemReferenceParam;

/**
 * Input message
 * A message input to the model with a role indicating instruction following
 * hierarchy. Instructions given with the `developer` or `system` role take
 * precedence over instructions given with the `user` role.
 */
export interface InputMessage {
  /** The type of the message input. Always set to `message`. */
  type?: "message";
  /** The role of the message input. One of `user`, `system`, or `developer`. */
  role: "user" | "system" | "developer";
  /**
   * The status of item. One of `in_progress`, `completed`, or
   * `incomplete`. Populated when items are returned via API.
   */
  status?: "in_progress" | "completed" | "incomplete";
  /**
   * A list of one or many input items to the model, containing different content
   * types.
   */
  content: InputMessageContentList;
}

/**
 * Input item content list
 * A list of one or many input items to the model, containing different content
 * types.
 */
export type InputMessageContentList = InputContent[];

export type InputMessageResource = InputMessage & {
  /** The unique ID of the message input. */
  id: string;
};

/** Represents an individual `invite` to the organization. */
export interface Invite {
  /** The object type, which is always `organization.invite` */
  object: "organization.invite";
  /** The identifier, which can be referenced in API endpoints */
  id: string;
  /** The email address of the individual to whom the invite was sent */
  email: string;
  /** `owner` or `reader` */
  role: "owner" | "reader";
  /** `accepted`,`expired`, or `pending` */
  status: "accepted" | "expired" | "pending";
  /** The Unix timestamp (in seconds) of when the invite was sent. */
  invited_at: number;
  /** The Unix timestamp (in seconds) of when the invite expires. */
  expires_at: number;
  /** The Unix timestamp (in seconds) of when the invite was accepted. */
  accepted_at?: number;
  /** The projects that were granted membership upon acceptance of the invite. */
  projects?: {
    /** Project's public ID */
    id?: string;
    /** Project membership role */
    role?: "member" | "owner";
  }[];
}

export interface InviteDeleteResponse {
  /** The object type, which is always `organization.invite.deleted` */
  object: "organization.invite.deleted";
  id: string;
  deleted: boolean;
}

export interface InviteListResponse {
  /** The object type, which is always `list` */
  object: "list";
  data: Invite[];
  /** The first `invite_id` in the retrieved `list` */
  first_id?: string;
  /** The last `invite_id` in the retrieved `list` */
  last_id?: string;
  /** The `has_more` property is used for pagination to indicate there are additional results. */
  has_more?: boolean;
}

export interface InviteRequest {
  /** Send an email to this address */
  email: string;
  /** `owner` or `reader` */
  role: "reader" | "owner";
  /** An array of projects to which membership is granted at the same time the org invite is accepted. If omitted, the user will be invited to the default project for compatibility with legacy behavior. */
  projects?: {
    /** Project's public ID */
    id: string;
    /** Project membership role */
    role: "member" | "owner";
  }[];
}

/** Content item used to generate a response. */
export type Item =
  | InputMessage
  | OutputMessage
  | FileSearchToolCall
  | ComputerToolCall
  | ComputerCallOutputItemParam
  | WebSearchToolCall
  | FunctionToolCall
  | FunctionCallOutputItemParam
  | ReasoningItem
  | ImageGenToolCall
  | CodeInterpreterToolCall
  | LocalShellToolCall
  | LocalShellToolCallOutput
  | MCPListTools
  | MCPApprovalRequest
  | MCPApprovalResponse
  | MCPToolCall;

/** Content item used to generate a response. */
export type ItemResource =
  | InputMessageResource
  | OutputMessage
  | FileSearchToolCall
  | ComputerToolCall
  | ComputerToolCallOutputResource
  | WebSearchToolCall
  | FunctionToolCallResource
  | FunctionToolCallOutputResource
  | ImageGenToolCall
  | CodeInterpreterToolCall
  | LocalShellToolCall
  | LocalShellToolCallOutput
  | MCPListTools
  | MCPApprovalRequest
  | MCPApprovalResponseResource
  | MCPToolCall;

/**
 * KeyPress
 * A collection of keypresses the model would like to perform.
 */
export interface KeyPress {
  /**
   * Specifies the event type. For a keypress action, this property is
   * always set to `keypress`.
   * @default "keypress"
   */
  type: "keypress";
  /**
   * The combination of keys the model is requesting to be pressed. This is an
   * array of strings, each representing a key.
   */
  keys: string[];
}

export interface ListAssistantsResponse {
  /** @example "list" */
  object: string;
  data: AssistantObject[];
  /** @example "asst_abc123" */
  first_id: string;
  /** @example "asst_abc456" */
  last_id: string;
  /** @example false */
  has_more: boolean;
}

export interface ListAuditLogsResponse {
  object: "list";
  data: AuditLog[];
  /** @example "audit_log-defb456h8dks" */
  first_id: string;
  /** @example "audit_log-hnbkd8s93s" */
  last_id: string;
  has_more: boolean;
}

export interface ListBatchesResponse {
  data: Batch[];
  /** @example "batch_abc123" */
  first_id?: string;
  /** @example "batch_abc456" */
  last_id?: string;
  has_more: boolean;
  object: "list";
}

export interface ListCertificatesResponse {
  data: Certificate[];
  /** @example "cert_abc" */
  first_id?: string;
  /** @example "cert_abc" */
  last_id?: string;
  has_more: boolean;
  object: "list";
}

export interface ListFilesResponse {
  /** @example "list" */
  object: string;
  data: OpenAIFile[];
  /** @example "file-abc123" */
  first_id: string;
  /** @example "file-abc456" */
  last_id: string;
  /** @example false */
  has_more: boolean;
}

export interface ListFineTuningCheckpointPermissionResponse {
  data: FineTuningCheckpointPermission[];
  object: "list";
  first_id?: string | null;
  last_id?: string | null;
  has_more: boolean;
}

export interface ListFineTuningJobCheckpointsResponse {
  data: FineTuningJobCheckpoint[];
  object: "list";
  first_id?: string | null;
  last_id?: string | null;
  has_more: boolean;
}

export interface ListFineTuningJobEventsResponse {
  data: FineTuningJobEvent[];
  object: "list";
  has_more: boolean;
}

export interface ListMessagesResponse {
  /** @example "list" */
  object: string;
  data: MessageObject[];
  /** @example "msg_abc123" */
  first_id: string;
  /** @example "msg_abc123" */
  last_id: string;
  /** @example false */
  has_more: boolean;
}

export interface ListModelsResponse {
  object: "list";
  data: Model[];
}

export interface ListPaginatedFineTuningJobsResponse {
  data: FineTuningJob[];
  has_more: boolean;
  object: "list";
}

export interface ListRunStepsResponse {
  /** @example "list" */
  object: string;
  data: RunStepObject[];
  /** @example "step_abc123" */
  first_id: string;
  /** @example "step_abc456" */
  last_id: string;
  /** @example false */
  has_more: boolean;
}

export interface ListRunsResponse {
  /** @example "list" */
  object: string;
  data: RunObject[];
  /** @example "run_abc123" */
  first_id: string;
  /** @example "run_abc456" */
  last_id: string;
  /** @example false */
  has_more: boolean;
}

export interface ListVectorStoreFilesResponse {
  /** @example "list" */
  object: string;
  data: VectorStoreFileObject[];
  /** @example "file-abc123" */
  first_id: string;
  /** @example "file-abc456" */
  last_id: string;
  /** @example false */
  has_more: boolean;
}

export interface ListVectorStoresResponse {
  /** @example "list" */
  object: string;
  data: VectorStoreObject[];
  /** @example "vs_abc123" */
  first_id: string;
  /** @example "vs_abc456" */
  last_id: string;
  /** @example false */
  has_more: boolean;
}

/**
 * Local shell exec action
 * Execute a shell command on the server.
 */
export interface LocalShellExecAction {
  /** The type of the local shell action. Always `exec`. */
  type: "exec";
  /** The command to run. */
  command: string[];
  /** Optional timeout in milliseconds for the command. */
  timeout_ms?: number | null;
  /** Optional working directory to run the command in. */
  working_directory?: string | null;
  /** Environment variables to set for the command. */
  env: Record<string, string>;
  /** Optional user to run the command as. */
  user?: string | null;
}

/**
 * Local shell tool
 * A tool that allows the model to execute shell commands in a local environment.
 */
export interface LocalShellTool {
  /** The type of the local shell tool. Always `local_shell`. */
  type: "local_shell";
}

/**
 * Local shell call
 * A tool call to run a command on the local shell.
 */
export interface LocalShellToolCall {
  /** The type of the local shell call. Always `local_shell_call`. */
  type: "local_shell_call";
  /** The unique ID of the local shell call. */
  id: string;
  /** The unique ID of the local shell tool call generated by the model. */
  call_id: string;
  /** Execute a shell command on the server. */
  action: LocalShellExecAction;
  /** The status of the local shell call. */
  status: "in_progress" | "completed" | "incomplete";
}

/**
 * Local shell call output
 * The output of a local shell tool call.
 */
export interface LocalShellToolCallOutput {
  /** The type of the local shell tool call output. Always `local_shell_call_output`. */
  type: "local_shell_call_output";
  /** The unique ID of the local shell tool call generated by the model. */
  id: string;
  /** A JSON string of the output of the local shell tool call. */
  output: string;
  /** The status of the item. One of `in_progress`, `completed`, or `incomplete`. */
  status?: "in_progress" | "completed" | "incomplete" | null;
}

/** A log probability object. */
export interface LogProbProperties {
  /** The token that was used to generate the log probability. */
  token: string;
  /** The log probability of the token. */
  logprob: number;
  /** The bytes that were used to generate the log probability. */
  bytes: number[];
}

/**
 * MCP approval request
 * A request for human approval of a tool invocation.
 */
export interface MCPApprovalRequest {
  /** The type of the item. Always `mcp_approval_request`. */
  type: "mcp_approval_request";
  /** The unique ID of the approval request. */
  id: string;
  /** The label of the MCP server making the request. */
  server_label: string;
  /** The name of the tool to run. */
  name: string;
  /** A JSON string of arguments for the tool. */
  arguments: string;
}

/**
 * MCP approval response
 * A response to an MCP approval request.
 */
export interface MCPApprovalResponse {
  /** The type of the item. Always `mcp_approval_response`. */
  type: "mcp_approval_response";
  /** The unique ID of the approval response */
  id?: string | null;
  /** The ID of the approval request being answered. */
  approval_request_id: string;
  /** Whether the request was approved. */
  approve: boolean;
  /** Optional reason for the decision. */
  reason?: string | null;
}

/**
 * MCP approval response
 * A response to an MCP approval request.
 */
export interface MCPApprovalResponseResource {
  /** The type of the item. Always `mcp_approval_response`. */
  type: "mcp_approval_response";
  /** The unique ID of the approval response */
  id: string;
  /** The ID of the approval request being answered. */
  approval_request_id: string;
  /** Whether the request was approved. */
  approve: boolean;
  /** Optional reason for the decision. */
  reason?: string | null;
}

/**
 * MCP list tools
 * A list of tools available on an MCP server.
 */
export interface MCPListTools {
  /** The type of the item. Always `mcp_list_tools`. */
  type: "mcp_list_tools";
  /** The unique ID of the list. */
  id: string;
  /** The label of the MCP server. */
  server_label: string;
  /** The tools available on the server. */
  tools: MCPListToolsTool[];
  /** Error message if the server could not list tools. */
  error?: string | null;
}

/**
 * MCP list tools tool
 * A tool available on an MCP server.
 */
export interface MCPListToolsTool {
  /** The name of the tool. */
  name: string;
  /** The description of the tool. */
  description?: string | null;
  /** The JSON schema describing the tool's input. */
  input_schema: object;
  /** Additional annotations about the tool. */
  annotations?: object | null;
}

/**
 * MCP tool
 * Give the model access to additional tools via remote Model Context Protocol
 * (MCP) servers. [Learn more about MCP](/docs/guides/tools-remote-mcp).
 */
export interface MCPTool {
  /** The type of the MCP tool. Always `mcp`. */
  type: "mcp";
  /** A label for this MCP server, used to identify it in tool calls. */
  server_label: string;
  /** The URL for the MCP server. */
  server_url: string;
  /** Optional description of the MCP server, used to provide more context. */
  server_description?: string;
  /**
   * Optional HTTP headers to send to the MCP server. Use for authentication
   * or other purposes.
   */
  headers?: Record<string, string>;
  /** List of allowed tool names or a filter object. */
  allowed_tools?:
    | string[]
    | {
        /**
         * MCP allowed tools
         * List of allowed tool names.
         */
        tool_names?: string[];
      }
    | null;
  /**
   * Specify which of the MCP server's tools require approval.
   * @default "always"
   */
  require_approval?:
    | {
        /** A list of tools that always require approval. */
        always?: {
          /** List of tools that require approval. */
          tool_names?: string[];
        };
        /** A list of tools that never require approval. */
        never?: {
          /** List of tools that do not require approval. */
          tool_names?: string[];
        };
      }
    | "always"
    | "never"
    | null;
}

/**
 * MCP tool call
 * An invocation of a tool on an MCP server.
 */
export interface MCPToolCall {
  /** The type of the item. Always `mcp_call`. */
  type: "mcp_call";
  /** The unique ID of the tool call. */
  id: string;
  /** The label of the MCP server running the tool. */
  server_label: string;
  /** The name of the tool that was run. */
  name: string;
  /** A JSON string of the arguments passed to the tool. */
  arguments: string;
  /** The output from the tool call. */
  output?: string | null;
  /** The error from the tool call, if any. */
  error?: string | null;
}

/**
 * Image file
 * References an image [File](/docs/api-reference/files) in the content of a message.
 */
export interface MessageContentImageFileObject {
  /** Always `image_file`. */
  type: "image_file";
  image_file: {
    /** The [File](/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content. */
    file_id: string;
    /**
     * Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.
     * @default "auto"
     */
    detail?: "auto" | "low" | "high";
  };
}

/**
 * Image URL
 * References an image URL in the content of a message.
 */
export interface MessageContentImageUrlObject {
  /** The type of the content part. */
  type: "image_url";
  image_url: {
    /**
     * The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.
     * @format uri
     */
    url: string;
    /**
     * Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`
     * @default "auto"
     */
    detail?: "auto" | "low" | "high";
  };
}

/**
 * Refusal
 * The refusal content generated by the assistant.
 */
export interface MessageContentRefusalObject {
  /** Always `refusal`. */
  type: "refusal";
  refusal: string;
}

/**
 * File citation
 * A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.
 */
export interface MessageContentTextAnnotationsFileCitationObject {
  /** Always `file_citation`. */
  type: "file_citation";
  /** The text in the message content that needs to be replaced. */
  text: string;
  file_citation: {
    /** The ID of the specific File the citation is from. */
    file_id: string;
  };
  /** @min 0 */
  start_index: number;
  /** @min 0 */
  end_index: number;
}

/**
 * File path
 * A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.
 */
export interface MessageContentTextAnnotationsFilePathObject {
  /** Always `file_path`. */
  type: "file_path";
  /** The text in the message content that needs to be replaced. */
  text: string;
  file_path: {
    /** The ID of the file that was generated. */
    file_id: string;
  };
  /** @min 0 */
  start_index: number;
  /** @min 0 */
  end_index: number;
}

/**
 * Text
 * The text content that is part of a message.
 */
export interface MessageContentTextObject {
  /** Always `text`. */
  type: "text";
  text: {
    /** The data that makes up the text. */
    value: string;
    annotations: (MessageContentTextAnnotationsFileCitationObject | MessageContentTextAnnotationsFilePathObject)[];
  };
}

/**
 * Image file
 * References an image [File](/docs/api-reference/files) in the content of a message.
 */
export interface MessageDeltaContentImageFileObject {
  /** The index of the content part in the message. */
  index: number;
  /** Always `image_file`. */
  type: "image_file";
  image_file?: {
    /** The [File](/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content. */
    file_id?: string;
    /**
     * Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.
     * @default "auto"
     */
    detail?: "auto" | "low" | "high";
  };
}

/**
 * Image URL
 * References an image URL in the content of a message.
 */
export interface MessageDeltaContentImageUrlObject {
  /** The index of the content part in the message. */
  index: number;
  /** Always `image_url`. */
  type: "image_url";
  image_url?: {
    /** The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp. */
    url?: string;
    /**
     * Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.
     * @default "auto"
     */
    detail?: "auto" | "low" | "high";
  };
}

/**
 * Refusal
 * The refusal content that is part of a message.
 */
export interface MessageDeltaContentRefusalObject {
  /** The index of the refusal part in the message. */
  index: number;
  /** Always `refusal`. */
  type: "refusal";
  refusal?: string;
}

/**
 * File citation
 * A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.
 */
export interface MessageDeltaContentTextAnnotationsFileCitationObject {
  /** The index of the annotation in the text content part. */
  index: number;
  /** Always `file_citation`. */
  type: "file_citation";
  /** The text in the message content that needs to be replaced. */
  text?: string;
  file_citation?: {
    /** The ID of the specific File the citation is from. */
    file_id?: string;
    /** The specific quote in the file. */
    quote?: string;
  };
  /** @min 0 */
  start_index?: number;
  /** @min 0 */
  end_index?: number;
}

/**
 * File path
 * A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.
 */
export interface MessageDeltaContentTextAnnotationsFilePathObject {
  /** The index of the annotation in the text content part. */
  index: number;
  /** Always `file_path`. */
  type: "file_path";
  /** The text in the message content that needs to be replaced. */
  text?: string;
  file_path?: {
    /** The ID of the file that was generated. */
    file_id?: string;
  };
  /** @min 0 */
  start_index?: number;
  /** @min 0 */
  end_index?: number;
}

/**
 * Text
 * The text content that is part of a message.
 */
export interface MessageDeltaContentTextObject {
  /** The index of the content part in the message. */
  index: number;
  /** Always `text`. */
  type: "text";
  text?: {
    /** The data that makes up the text. */
    value?: string;
    annotations?: (
      | MessageDeltaContentTextAnnotationsFileCitationObject
      | MessageDeltaContentTextAnnotationsFilePathObject
    )[];
  };
}

/**
 * Message delta object
 * Represents a message delta i.e. any changed fields on a message during streaming.
 */
export interface MessageDeltaObject {
  /** The identifier of the message, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `thread.message.delta`. */
  object: "thread.message.delta";
  /** The delta containing the fields that have changed on the Message. */
  delta: {
    /** The entity that produced the message. One of `user` or `assistant`. */
    role?: "user" | "assistant";
    /** The content of the message in array of text and/or images. */
    content?: (
      | MessageDeltaContentImageFileObject
      | MessageDeltaContentTextObject
      | MessageDeltaContentRefusalObject
      | MessageDeltaContentImageUrlObject
    )[];
  };
}

/**
 * The message object
 * Represents a message within a [thread](/docs/api-reference/threads).
 */
export interface MessageObject {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `thread.message`. */
  object: "thread.message";
  /** The Unix timestamp (in seconds) for when the message was created. */
  created_at: number;
  /** The [thread](/docs/api-reference/threads) ID that this message belongs to. */
  thread_id: string;
  /** The status of the message, which can be either `in_progress`, `incomplete`, or `completed`. */
  status: "in_progress" | "incomplete" | "completed";
  /** On an incomplete message, details about why the message is incomplete. */
  incomplete_details: {
    /** The reason the message is incomplete. */
    reason: "content_filter" | "max_tokens" | "run_cancelled" | "run_expired" | "run_failed";
  } | null;
  /** The Unix timestamp (in seconds) for when the message was completed. */
  completed_at: number | null;
  /** The Unix timestamp (in seconds) for when the message was marked as incomplete. */
  incomplete_at: number | null;
  /** The entity that produced the message. One of `user` or `assistant`. */
  role: "user" | "assistant";
  /** The content of the message in array of text and/or images. */
  content: (
    | MessageContentImageFileObject
    | MessageContentImageUrlObject
    | MessageContentTextObject
    | MessageContentRefusalObject
  )[];
  /** If applicable, the ID of the [assistant](/docs/api-reference/assistants) that authored this message. */
  assistant_id: string | null;
  /** The ID of the [run](/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints. */
  run_id: string | null;
  /** A list of files attached to the message, and the tools they were added to. */
  attachments:
    | {
        /** The ID of the file to attach to the message. */
        file_id?: string;
        /** The tools to add this file to. */
        tools?: (AssistantToolsCode | AssistantToolsFileSearchTypeOnly)[];
      }[]
    | null;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Metadata;
}

/**
 * Text
 * The text content that is part of a message.
 */
export interface MessageRequestContentTextObject {
  /** Always `text`. */
  type: "text";
  /** Text content to be sent to the model */
  text: string;
}

/** Occurs when a [message](/docs/api-reference/messages/object) is created. */
export type MessageStreamEvent =
  | {
      event: "thread.message.created";
      /** Represents a message within a [thread](/docs/api-reference/threads). */
      data: MessageObject;
    }
  | {
      event: "thread.message.in_progress";
      /** Represents a message within a [thread](/docs/api-reference/threads). */
      data: MessageObject;
    }
  | {
      event: "thread.message.delta";
      /** Represents a message delta i.e. any changed fields on a message during streaming. */
      data: MessageDeltaObject;
    }
  | {
      event: "thread.message.completed";
      /** Represents a message within a [thread](/docs/api-reference/threads). */
      data: MessageObject;
    }
  | {
      event: "thread.message.incomplete";
      /** Represents a message within a [thread](/docs/api-reference/threads). */
      data: MessageObject;
    };

/**
 * Set of 16 key-value pairs that can be attached to an object. This can be
 * useful for storing additional information about the object in a structured
 * format, and querying for objects via API or the dashboard.
 *
 * Keys are strings with a maximum length of 64 characters. Values are strings
 * with a maximum length of 512 characters.
 */
export type Metadata = Record<string, string>;

/**
 * Model
 * Describes an OpenAI model offering that can be used with the API.
 */
export interface Model {
  /** The model identifier, which can be referenced in the API endpoints. */
  id: string;
  /** The Unix timestamp (in seconds) when the model was created. */
  created: number;
  /** The object type, which is always "model". */
  object: "model";
  /** The organization that owns the model. */
  owned_by: string;
}

export type ModelIds = ModelIdsShared | ModelIdsResponses;

/** @example "gpt-4o" */
export type ModelIdsResponses =
  | ModelIdsShared
  | "o1-pro"
  | "o1-pro-2025-03-19"
  | "o3-pro"
  | "o3-pro-2025-06-10"
  | "o3-deep-research"
  | "o3-deep-research-2025-06-26"
  | "o4-mini-deep-research"
  | "o4-mini-deep-research-2025-06-26"
  | "computer-use-preview"
  | "computer-use-preview-2025-03-11";

/** @example "gpt-4o" */
export type ModelIdsShared =
  | string
  | "gpt-4.1"
  | "gpt-4.1-mini"
  | "gpt-4.1-nano"
  | "gpt-4.1-2025-04-14"
  | "gpt-4.1-mini-2025-04-14"
  | "gpt-4.1-nano-2025-04-14"
  | "o4-mini"
  | "o4-mini-2025-04-16"
  | "o3"
  | "o3-2025-04-16"
  | "o3-mini"
  | "o3-mini-2025-01-31"
  | "o1"
  | "o1-2024-12-17"
  | "o1-preview"
  | "o1-preview-2024-09-12"
  | "o1-mini"
  | "o1-mini-2024-09-12"
  | "gpt-4o"
  | "gpt-4o-2024-11-20"
  | "gpt-4o-2024-08-06"
  | "gpt-4o-2024-05-13"
  | "gpt-4o-audio-preview"
  | "gpt-4o-audio-preview-2024-10-01"
  | "gpt-4o-audio-preview-2024-12-17"
  | "gpt-4o-audio-preview-2025-06-03"
  | "gpt-4o-mini-audio-preview"
  | "gpt-4o-mini-audio-preview-2024-12-17"
  | "gpt-4o-search-preview"
  | "gpt-4o-mini-search-preview"
  | "gpt-4o-search-preview-2025-03-11"
  | "gpt-4o-mini-search-preview-2025-03-11"
  | "chatgpt-4o-latest"
  | "codex-mini-latest"
  | "gpt-4o-mini"
  | "gpt-4o-mini-2024-07-18"
  | "gpt-4-turbo"
  | "gpt-4-turbo-2024-04-09"
  | "gpt-4-0125-preview"
  | "gpt-4-turbo-preview"
  | "gpt-4-1106-preview"
  | "gpt-4-vision-preview"
  | "gpt-4"
  | "gpt-4-0314"
  | "gpt-4-0613"
  | "gpt-4-32k"
  | "gpt-4-32k-0314"
  | "gpt-4-32k-0613"
  | "gpt-3.5-turbo"
  | "gpt-3.5-turbo-16k"
  | "gpt-3.5-turbo-0301"
  | "gpt-3.5-turbo-0613"
  | "gpt-3.5-turbo-1106"
  | "gpt-3.5-turbo-0125"
  | "gpt-3.5-turbo-16k-0613";

export interface ModelResponseProperties {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
  /**
   * An integer between 0 and 20 specifying the number of most likely tokens to
   * return at each token position, each with an associated log probability.
   * @min 0
   * @max 20
   */
  top_logprobs?: number | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * We generally recommend altering this or `top_p` but not both.
   * @min 0
   * @max 2
   * @default 1
   * @example 1
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling,
   * where the model considers the results of the tokens with top_p probability
   * mass. So 0.1 means only the tokens comprising the top 10% probability mass
   * are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   * @min 0
   * @max 1
   * @default 1
   * @example 1
   */
  top_p?: number | null;
  /**
   * A stable identifier for your end-users.
   * Used to boost cache hit rates by better bucketing similar requests and  to help OpenAI detect and prevent abuse. [Learn more](/docs/guides/safety-best-practices#end-user-ids).
   * @example "user-1234"
   */
  user?: string;
  /**
   * Specifies the processing type used for serving the request.
   *   - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
   *   - If set to 'default', then the requset will be processed with the standard pricing and performance for the selected model.
   *   - If set to '[flex](/docs/guides/flex-processing)' or 'priority', then the request will be processed with the corresponding service tier. [Contact sales](https://openai.com/contact-sales) to learn more about Priority processing.
   *   - When not set, the default behavior is 'auto'.
   *
   *   When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.
   */
  service_tier?: ServiceTier;
}

export interface ModifyAssistantRequest {
  /** ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models) for descriptions of them. */
  model?: string | AssistantSupportedModels;
  /**
   * **o-series models only**
   *
   * Constrains effort on reasoning for
   * [reasoning models](https://platform.openai.com/docs/guides/reasoning).
   * Currently supported values are `low`, `medium`, and `high`. Reducing
   * reasoning effort can result in faster responses and fewer tokens used
   * on reasoning in a response.
   */
  reasoning_effort?: ReasoningEffort;
  /**
   * The name of the assistant. The maximum length is 256 characters.
   * @maxLength 256
   */
  name?: string | null;
  /**
   * The description of the assistant. The maximum length is 512 characters.
   * @maxLength 512
   */
  description?: string | null;
  /**
   * The system instructions that the assistant uses. The maximum length is 256,000 characters.
   * @maxLength 256000
   */
  instructions?: string | null;
  /**
   * A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.
   * @maxItems 128
   * @default []
   */
  tools?: (AssistantToolsCode | AssistantToolsFileSearch | AssistantToolsFunction)[];
  /** A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs. */
  tool_resources?: {
    code_interpreter?: {
      /**
       * Overrides the list of [file](/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.
       * @maxItems 20
       * @default []
       */
      file_ids?: string[];
    };
    file_search?: {
      /**
       * Overrides the [vector store](/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.
       * @maxItems 1
       */
      vector_store_ids?: string[];
    };
  } | null;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * @min 0
   * @max 2
   * @default 1
   * @example 1
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   * @min 0
   * @max 1
   * @default 1
   * @example 1
   */
  top_p?: number | null;
  /**
   * Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.
   *
   * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).
   *
   * Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.
   *
   * **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.
   */
  response_format?: AssistantsApiResponseFormatOption | null;
}

export interface ModifyCertificateRequest {
  /** The updated name for the certificate */
  name: string;
}

export interface ModifyMessageRequest {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
}

export interface ModifyRunRequest {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
}

export interface ModifyThreadRequest {
  /** A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs. */
  tool_resources?: {
    code_interpreter?: {
      /**
       * A list of [file](/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.
       * @maxItems 20
       * @default []
       */
      file_ids?: string[];
    };
    file_search?: {
      /**
       * The [vector store](/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.
       * @maxItems 1
       */
      vector_store_ids?: string[];
    };
  } | null;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
}

/**
 * Move
 * A mouse move action.
 */
export interface Move {
  /**
   * Specifies the event type. For a move action, this property is
   * always set to `move`.
   * @default "move"
   */
  type: "move";
  /** The x-coordinate to move to. */
  x: number;
  /** The y-coordinate to move to. */
  y: number;
}

/**
 * OpenAIFile
 * The `File` object represents a document that has been uploaded to OpenAI.
 */
export interface OpenAIFile {
  /** The file identifier, which can be referenced in the API endpoints. */
  id: string;
  /** The size of the file, in bytes. */
  bytes: number;
  /** The Unix timestamp (in seconds) for when the file was created. */
  created_at: number;
  /** The Unix timestamp (in seconds) for when the file will expire. */
  expires_at?: number;
  /** The name of the file. */
  filename: string;
  /** The object type, which is always `file`. */
  object: "file";
  /** The intended purpose of the file. Supported values are `assistants`, `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`, `vision`, and `user_data`. */
  purpose:
    | "assistants"
    | "assistants_output"
    | "batch"
    | "batch_output"
    | "fine-tune"
    | "fine-tune-results"
    | "vision"
    | "user_data";
  /**
   * Deprecated. The current status of the file, which can be either `uploaded`, `processed`, or `error`.
   * @deprecated
   */
  status: "uploaded" | "processed" | "error";
  /**
   * Deprecated. For details on why a fine-tuning training file failed validation, see the `error` field on `fine_tuning.job`.
   * @deprecated
   */
  status_details?: string;
}

/**
 * Other Chunking Strategy
 * This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.
 */
export interface OtherChunkingStrategyResponseParam {
  /** Always `other`. */
  type: "other";
}

/**
 * Output audio
 * An audio output from the model.
 */
export interface OutputAudio {
  /** The type of the output audio. Always `output_audio`. */
  type: "output_audio";
  /** Base64-encoded audio data from the model. */
  data: string;
  /** The transcript of the audio data from the model. */
  transcript: string;
}

export type OutputContent = OutputTextContent | RefusalContent;

export type OutputItem =
  | OutputMessage
  | FileSearchToolCall
  | FunctionToolCall
  | WebSearchToolCall
  | ComputerToolCall
  | ReasoningItem
  | ImageGenToolCall
  | CodeInterpreterToolCall
  | LocalShellToolCall
  | MCPToolCall
  | MCPListTools
  | MCPApprovalRequest;

/**
 * Output message
 * An output message from the model.
 */
export interface OutputMessage {
  /** The unique ID of the output message. */
  id: string;
  /** The type of the output message. Always `message`. */
  type: "message";
  /** The role of the output message. Always `assistant`. */
  role: "assistant";
  /** The content of the output message. */
  content: OutputContent[];
  /**
   * The status of the message input. One of `in_progress`, `completed`, or
   * `incomplete`. Populated when input items are returned via API.
   */
  status: "in_progress" | "completed" | "incomplete";
}

/**
 * Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.
 * @default true
 */
export type ParallelToolCalls = boolean;

/**
 * Static Content
 * Static predicted output content, such as the content of a text file that is
 * being regenerated.
 */
export interface PredictionContent {
  /**
   * The type of the predicted content you want to provide. This type is
   * currently always `content`.
   */
  type: "content";
  /**
   * The content that should be matched when generating a model response.
   * If generated tokens would match this content, the entire model response
   * can be returned much more quickly.
   */
  content: string | ChatCompletionRequestMessageContentPartText[];
}

/** Represents an individual project. */
export interface Project {
  /** The identifier, which can be referenced in API endpoints */
  id: string;
  /** The object type, which is always `organization.project` */
  object: "organization.project";
  /** The name of the project. This appears in reporting. */
  name: string;
  /** The Unix timestamp (in seconds) of when the project was created. */
  created_at: number;
  /** The Unix timestamp (in seconds) of when the project was archived or `null`. */
  archived_at?: number | null;
  /** `active` or `archived` */
  status: "active" | "archived";
}

/** Represents an individual API key in a project. */
export interface ProjectApiKey {
  /** The object type, which is always `organization.project.api_key` */
  object: "organization.project.api_key";
  /** The redacted value of the API key */
  redacted_value: string;
  /** The name of the API key */
  name: string;
  /** The Unix timestamp (in seconds) of when the API key was created */
  created_at: number;
  /** The Unix timestamp (in seconds) of when the API key was last used. */
  last_used_at: number;
  /** The identifier, which can be referenced in API endpoints */
  id: string;
  owner: {
    /** `user` or `service_account` */
    type?: "user" | "service_account";
    /** Represents an individual user in a project. */
    user?: ProjectUser;
    /** Represents an individual service account in a project. */
    service_account?: ProjectServiceAccount;
  };
}

export interface ProjectApiKeyDeleteResponse {
  object: "organization.project.api_key.deleted";
  id: string;
  deleted: boolean;
}

export interface ProjectApiKeyListResponse {
  object: "list";
  data: ProjectApiKey[];
  first_id: string;
  last_id: string;
  has_more: boolean;
}

export interface ProjectCreateRequest {
  /** The friendly name of the project, this name appears in reports. */
  name: string;
}

export interface ProjectListResponse {
  object: "list";
  data: Project[];
  first_id: string;
  last_id: string;
  has_more: boolean;
}

/** Represents a project rate limit config. */
export interface ProjectRateLimit {
  /** The object type, which is always `project.rate_limit` */
  object: "project.rate_limit";
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The model this rate limit applies to. */
  model: string;
  /** The maximum requests per minute. */
  max_requests_per_1_minute: number;
  /** The maximum tokens per minute. */
  max_tokens_per_1_minute: number;
  /** The maximum images per minute. Only present for relevant models. */
  max_images_per_1_minute?: number;
  /** The maximum audio megabytes per minute. Only present for relevant models. */
  max_audio_megabytes_per_1_minute?: number;
  /** The maximum requests per day. Only present for relevant models. */
  max_requests_per_1_day?: number;
  /** The maximum batch input tokens per day. Only present for relevant models. */
  batch_1_day_max_input_tokens?: number;
}

export interface ProjectRateLimitListResponse {
  object: "list";
  data: ProjectRateLimit[];
  first_id: string;
  last_id: string;
  has_more: boolean;
}

export interface ProjectRateLimitUpdateRequest {
  /** The maximum requests per minute. */
  max_requests_per_1_minute?: number;
  /** The maximum tokens per minute. */
  max_tokens_per_1_minute?: number;
  /** The maximum images per minute. Only relevant for certain models. */
  max_images_per_1_minute?: number;
  /** The maximum audio megabytes per minute. Only relevant for certain models. */
  max_audio_megabytes_per_1_minute?: number;
  /** The maximum requests per day. Only relevant for certain models. */
  max_requests_per_1_day?: number;
  /** The maximum batch input tokens per day. Only relevant for certain models. */
  batch_1_day_max_input_tokens?: number;
}

/** Represents an individual service account in a project. */
export interface ProjectServiceAccount {
  /** The object type, which is always `organization.project.service_account` */
  object: "organization.project.service_account";
  /** The identifier, which can be referenced in API endpoints */
  id: string;
  /** The name of the service account */
  name: string;
  /** `owner` or `member` */
  role: "owner" | "member";
  /** The Unix timestamp (in seconds) of when the service account was created */
  created_at: number;
}

export interface ProjectServiceAccountApiKey {
  /** The object type, which is always `organization.project.service_account.api_key` */
  object: "organization.project.service_account.api_key";
  value: string;
  name: string;
  created_at: number;
  id: string;
}

export interface ProjectServiceAccountCreateRequest {
  /** The name of the service account being created. */
  name: string;
}

export interface ProjectServiceAccountCreateResponse {
  object: "organization.project.service_account";
  id: string;
  name: string;
  /** Service accounts can only have one role of type `member` */
  role: "member";
  created_at: number;
  api_key: ProjectServiceAccountApiKey;
}

export interface ProjectServiceAccountDeleteResponse {
  object: "organization.project.service_account.deleted";
  id: string;
  deleted: boolean;
}

export interface ProjectServiceAccountListResponse {
  object: "list";
  data: ProjectServiceAccount[];
  first_id: string;
  last_id: string;
  has_more: boolean;
}

export interface ProjectUpdateRequest {
  /** The updated name of the project, this name appears in reports. */
  name: string;
}

/** Represents an individual user in a project. */
export interface ProjectUser {
  /** The object type, which is always `organization.project.user` */
  object: "organization.project.user";
  /** The identifier, which can be referenced in API endpoints */
  id: string;
  /** The name of the user */
  name: string;
  /** The email address of the user */
  email: string;
  /** `owner` or `member` */
  role: "owner" | "member";
  /** The Unix timestamp (in seconds) of when the project was added. */
  added_at: number;
}

export interface ProjectUserCreateRequest {
  /** The ID of the user. */
  user_id: string;
  /** `owner` or `member` */
  role: "owner" | "member";
}

export interface ProjectUserDeleteResponse {
  object: "organization.project.user.deleted";
  id: string;
  deleted: boolean;
}

export interface ProjectUserListResponse {
  object: string;
  data: ProjectUser[];
  first_id: string;
  last_id: string;
  has_more: boolean;
}

export interface ProjectUserUpdateRequest {
  /** `owner` or `member` */
  role: "owner" | "member";
}

/**
 * Reference to a prompt template and its variables.
 * [Learn more](/docs/guides/text?api-mode=responses#reusable-prompts).
 */
export type Prompt = {
  /** The unique identifier of the prompt template to use. */
  id: string;
  /** Optional version of the prompt template. */
  version?: string | null;
  /**
   * Optional map of values to substitute in for variables in your
   * prompt. The substitution values can either be strings, or other
   * Response input types like images or files.
   */
  variables?: ResponsePromptVariables;
};

/** A realtime client event. */
export type RealtimeClientEvent =
  | RealtimeClientEventConversationItemCreate
  | RealtimeClientEventConversationItemDelete
  | RealtimeClientEventConversationItemRetrieve
  | RealtimeClientEventConversationItemTruncate
  | RealtimeClientEventInputAudioBufferAppend
  | RealtimeClientEventInputAudioBufferClear
  | RealtimeClientEventOutputAudioBufferClear
  | RealtimeClientEventInputAudioBufferCommit
  | RealtimeClientEventResponseCancel
  | RealtimeClientEventResponseCreate
  | RealtimeClientEventSessionUpdate
  | RealtimeClientEventTranscriptionSessionUpdate;

/**
 * Add a new Item to the Conversation's context, including messages, function
 * calls, and function call responses. This event can be used both to populate a
 * "history" of the conversation and to add new items mid-stream, but has the
 * current limitation that it cannot populate assistant audio messages.
 *
 * If successful, the server will respond with a `conversation.item.created`
 * event, otherwise an `error` event will be sent.
 */
export interface RealtimeClientEventConversationItemCreate {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `conversation.item.create`. */
  type: "conversation.item.create";
  /**
   * The ID of the preceding item after which the new item will be inserted.
   * If not set, the new item will be appended to the end of the conversation.
   * If set to `root`, the new item will be added to the beginning of the conversation.
   * If set to an existing ID, it allows an item to be inserted mid-conversation. If the
   * ID cannot be found, an error will be returned and the item will not be added.
   */
  previous_item_id?: string;
  /** The item to add to the conversation. */
  item: RealtimeConversationItem;
}

/**
 * Send this event when you want to remove any item from the conversation
 * history. The server will respond with a `conversation.item.deleted` event,
 * unless the item does not exist in the conversation history, in which case the
 * server will respond with an error.
 */
export interface RealtimeClientEventConversationItemDelete {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `conversation.item.delete`. */
  type: "conversation.item.delete";
  /** The ID of the item to delete. */
  item_id: string;
}

/**
 * Send this event when you want to retrieve the server's representation of a specific item in the conversation history. This is useful, for example, to inspect user audio after noise cancellation and VAD.
 * The server will respond with a `conversation.item.retrieved` event,
 * unless the item does not exist in the conversation history, in which case the
 * server will respond with an error.
 */
export interface RealtimeClientEventConversationItemRetrieve {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `conversation.item.retrieve`. */
  type: "conversation.item.retrieve";
  /** The ID of the item to retrieve. */
  item_id: string;
}

/**
 * Send this event to truncate a previous assistant message’s audio. The server
 * will produce audio faster than realtime, so this event is useful when the user
 * interrupts to truncate audio that has already been sent to the client but not
 * yet played. This will synchronize the server's understanding of the audio with
 * the client's playback.
 *
 * Truncating audio will delete the server-side text transcript to ensure there
 * is not text in the context that hasn't been heard by the user.
 *
 * If successful, the server will respond with a `conversation.item.truncated`
 * event.
 */
export interface RealtimeClientEventConversationItemTruncate {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `conversation.item.truncate`. */
  type: "conversation.item.truncate";
  /**
   * The ID of the assistant message item to truncate. Only assistant message
   * items can be truncated.
   */
  item_id: string;
  /** The index of the content part to truncate. Set this to 0. */
  content_index: number;
  /**
   * Inclusive duration up to which audio is truncated, in milliseconds. If
   * the audio_end_ms is greater than the actual audio duration, the server
   * will respond with an error.
   */
  audio_end_ms: number;
}

/**
 * Send this event to append audio bytes to the input audio buffer. The audio
 * buffer is temporary storage you can write to and later commit. In Server VAD
 * mode, the audio buffer is used to detect speech and the server will decide
 * when to commit. When Server VAD is disabled, you must commit the audio buffer
 * manually.
 *
 * The client may choose how much audio to place in each event up to a maximum
 * of 15 MiB, for example streaming smaller chunks from the client may allow the
 * VAD to be more responsive. Unlike made other client events, the server will
 * not send a confirmation response to this event.
 */
export interface RealtimeClientEventInputAudioBufferAppend {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `input_audio_buffer.append`. */
  type: "input_audio_buffer.append";
  /**
   * Base64-encoded audio bytes. This must be in the format specified by the
   * `input_audio_format` field in the session configuration.
   */
  audio: string;
}

/**
 * Send this event to clear the audio bytes in the buffer. The server will
 * respond with an `input_audio_buffer.cleared` event.
 */
export interface RealtimeClientEventInputAudioBufferClear {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `input_audio_buffer.clear`. */
  type: "input_audio_buffer.clear";
}

/**
 * Send this event to commit the user input audio buffer, which will create a
 * new user message item in the conversation. This event will produce an error
 * if the input audio buffer is empty. When in Server VAD mode, the client does
 * not need to send this event, the server will commit the audio buffer
 * automatically.
 *
 * Committing the input audio buffer will trigger input audio transcription
 * (if enabled in session configuration), but it will not create a response
 * from the model. The server will respond with an `input_audio_buffer.committed`
 * event.
 */
export interface RealtimeClientEventInputAudioBufferCommit {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `input_audio_buffer.commit`. */
  type: "input_audio_buffer.commit";
}

/**
 * **WebRTC Only:** Emit to cut off the current audio response. This will trigger the server to
 * stop generating audio and emit a `output_audio_buffer.cleared` event. This
 * event should be preceded by a `response.cancel` client event to stop the
 * generation of the current response.
 * [Learn more](/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).
 */
export interface RealtimeClientEventOutputAudioBufferClear {
  /** The unique ID of the client event used for error handling. */
  event_id?: string;
  /** The event type, must be `output_audio_buffer.clear`. */
  type: "output_audio_buffer.clear";
}

/**
 * Send this event to cancel an in-progress response. The server will respond
 * with a `response.cancelled` event or an error if there is no response to
 * cancel.
 */
export interface RealtimeClientEventResponseCancel {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `response.cancel`. */
  type: "response.cancel";
  /**
   * A specific response ID to cancel - if not provided, will cancel an
   * in-progress response in the default conversation.
   */
  response_id?: string;
}

/**
 * This event instructs the server to create a Response, which means triggering
 * model inference. When in Server VAD mode, the server will create Responses
 * automatically.
 *
 * A Response will include at least one Item, and may have two, in which case
 * the second will be a function call. These Items will be appended to the
 * conversation history.
 *
 * The server will respond with a `response.created` event, events for Items
 * and content created, and finally a `response.done` event to indicate the
 * Response is complete.
 *
 * The `response.create` event includes inference configuration like
 * `instructions`, and `temperature`. These fields will override the Session's
 * configuration for this Response only.
 */
export interface RealtimeClientEventResponseCreate {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `response.create`. */
  type: "response.create";
  /** Create a new Realtime response with these parameters */
  response?: RealtimeResponseCreateParams;
}

/**
 * Send this event to update the session’s default configuration.
 * The client may send this event at any time to update any field,
 * except for `voice`. However, note that once a session has been
 * initialized with a particular `model`, it can’t be changed to
 * another model using `session.update`.
 *
 * When the server receives a `session.update`, it will respond
 * with a `session.updated` event showing the full, effective configuration.
 * Only the fields that are present are updated. To clear a field like
 * `instructions`, pass an empty string.
 */
export interface RealtimeClientEventSessionUpdate {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `session.update`. */
  type: "session.update";
  /** Realtime session object configuration. */
  session: RealtimeSessionCreateRequest;
}

/** Send this event to update a transcription session. */
export interface RealtimeClientEventTranscriptionSessionUpdate {
  /** Optional client-generated ID used to identify this event. */
  event_id?: string;
  /** The event type, must be `transcription_session.update`. */
  type: "transcription_session.update";
  /** Realtime transcription session object configuration. */
  session: RealtimeTranscriptionSessionCreateRequest;
}

/** The item to add to the conversation. */
export interface RealtimeConversationItem {
  /**
   * The unique ID of the item, this can be generated by the client to help
   * manage server-side context, but is not required because the server will
   * generate one if not provided.
   */
  id?: string;
  /** The type of the item (`message`, `function_call`, `function_call_output`). */
  type?: "message" | "function_call" | "function_call_output";
  /** Identifier for the API object being returned - always `realtime.item`. */
  object?: "realtime.item";
  /**
   * The status of the item (`completed`, `incomplete`). These have no effect
   * on the conversation, but are accepted for consistency with the
   * `conversation.item.created` event.
   */
  status?: "completed" | "incomplete";
  /**
   * The role of the message sender (`user`, `assistant`, `system`), only
   * applicable for `message` items.
   */
  role?: "user" | "assistant" | "system";
  /**
   * The content of the message, applicable for `message` items.
   * - Message items of role `system` support only `input_text` content
   * - Message items of role `user` support `input_text` and `input_audio`
   *   content
   * - Message items of role `assistant` support `text` content.
   */
  content?: {
    /** The content type (`input_text`, `input_audio`, `item_reference`, `text`). */
    type?: "input_audio" | "input_text" | "item_reference" | "text";
    /** The text content, used for `input_text` and `text` content types. */
    text?: string;
    /**
     * ID of a previous conversation item to reference (for `item_reference`
     * content types in `response.create` events). These can reference both
     * client and server created items.
     */
    id?: string;
    /** Base64-encoded audio bytes, used for `input_audio` content type. */
    audio?: string;
    /** The transcript of the audio, used for `input_audio` content type. */
    transcript?: string;
  }[];
  /**
   * The ID of the function call (for `function_call` and
   * `function_call_output` items). If passed on a `function_call_output`
   * item, the server will check that a `function_call` item with the same
   * ID exists in the conversation history.
   */
  call_id?: string;
  /** The name of the function being called (for `function_call` items). */
  name?: string;
  /** The arguments of the function call (for `function_call` items). */
  arguments?: string;
  /** The output of the function call (for `function_call_output` items). */
  output?: string;
}

/** The item to add to the conversation. */
export interface RealtimeConversationItemWithReference {
  /**
   * For an item of type (`message` | `function_call` | `function_call_output`)
   * this field allows the client to assign the unique ID of the item. It is
   * not required because the server will generate one if not provided.
   *
   * For an item of type `item_reference`, this field is required and is a
   * reference to any item that has previously existed in the conversation.
   */
  id?: string;
  /** The type of the item (`message`, `function_call`, `function_call_output`, `item_reference`). */
  type?: "message" | "function_call" | "function_call_output";
  /** Identifier for the API object being returned - always `realtime.item`. */
  object?: "realtime.item";
  /**
   * The status of the item (`completed`, `incomplete`). These have no effect
   * on the conversation, but are accepted for consistency with the
   * `conversation.item.created` event.
   */
  status?: "completed" | "incomplete";
  /**
   * The role of the message sender (`user`, `assistant`, `system`), only
   * applicable for `message` items.
   */
  role?: "user" | "assistant" | "system";
  /**
   * The content of the message, applicable for `message` items.
   * - Message items of role `system` support only `input_text` content
   * - Message items of role `user` support `input_text` and `input_audio`
   *   content
   * - Message items of role `assistant` support `text` content.
   */
  content?: {
    /** The content type (`input_text`, `input_audio`, `item_reference`, `text`). */
    type?: "input_audio" | "input_text" | "item_reference" | "text";
    /** The text content, used for `input_text` and `text` content types. */
    text?: string;
    /**
     * ID of a previous conversation item to reference (for `item_reference`
     * content types in `response.create` events). These can reference both
     * client and server created items.
     */
    id?: string;
    /** Base64-encoded audio bytes, used for `input_audio` content type. */
    audio?: string;
    /** The transcript of the audio, used for `input_audio` content type. */
    transcript?: string;
  }[];
  /**
   * The ID of the function call (for `function_call` and
   * `function_call_output` items). If passed on a `function_call_output`
   * item, the server will check that a `function_call` item with the same
   * ID exists in the conversation history.
   */
  call_id?: string;
  /** The name of the function being called (for `function_call` items). */
  name?: string;
  /** The arguments of the function call (for `function_call` items). */
  arguments?: string;
  /** The output of the function call (for `function_call_output` items). */
  output?: string;
}

/** The response resource. */
export interface RealtimeResponse {
  /** The unique ID of the response. */
  id?: string;
  /** The object type, must be `realtime.response`. */
  object?: "realtime.response";
  /**
   * The final status of the response (`completed`, `cancelled`, `failed`, or
   * `incomplete`).
   */
  status?: "completed" | "cancelled" | "failed" | "incomplete";
  /** Additional details about the status. */
  status_details?: {
    /**
     * The type of error that caused the response to fail, corresponding
     * with the `status` field (`completed`, `cancelled`, `incomplete`,
     * `failed`).
     */
    type?: "completed" | "cancelled" | "failed" | "incomplete";
    /**
     * The reason the Response did not complete. For a `cancelled` Response,
     * one of `turn_detected` (the server VAD detected a new start of speech)
     * or `client_cancelled` (the client sent a cancel event). For an
     * `incomplete` Response, one of `max_output_tokens` or `content_filter`
     * (the server-side safety filter activated and cut off the response).
     */
    reason?: "turn_detected" | "client_cancelled" | "max_output_tokens" | "content_filter";
    /**
     * A description of the error that caused the response to fail,
     * populated when the `status` is `failed`.
     */
    error?: {
      /** The type of error. */
      type?: string;
      /** Error code, if any. */
      code?: string;
    };
  };
  /** The list of output items generated by the response. */
  output?: RealtimeConversationItem[];
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
  /**
   * Usage statistics for the Response, this will correspond to billing. A
   * Realtime API session will maintain a conversation context and append new
   * Items to the Conversation, thus output from previous turns (text and
   * audio tokens) will become the input for later turns.
   */
  usage?: {
    /**
     * The total number of tokens in the Response including input and output
     * text and audio tokens.
     */
    total_tokens?: number;
    /**
     * The number of input tokens used in the Response, including text and
     * audio tokens.
     */
    input_tokens?: number;
    /**
     * The number of output tokens sent in the Response, including text and
     * audio tokens.
     */
    output_tokens?: number;
    /** Details about the input tokens used in the Response. */
    input_token_details?: {
      /** The number of cached tokens used in the Response. */
      cached_tokens?: number;
      /** The number of text tokens used in the Response. */
      text_tokens?: number;
      /** The number of audio tokens used in the Response. */
      audio_tokens?: number;
    };
    /** Details about the output tokens used in the Response. */
    output_token_details?: {
      /** The number of text tokens used in the Response. */
      text_tokens?: number;
      /** The number of audio tokens used in the Response. */
      audio_tokens?: number;
    };
  };
  /**
   * Which conversation the response is added to, determined by the `conversation`
   * field in the `response.create` event. If `auto`, the response will be added to
   * the default conversation and the value of `conversation_id` will be an id like
   * `conv_1234`. If `none`, the response will not be added to any conversation and
   * the value of `conversation_id` will be `null`. If responses are being triggered
   * by server VAD, the response will be added to the default conversation, thus
   * the `conversation_id` will be an id like `conv_1234`.
   */
  conversation_id?: string;
  /**
   * The voice the model used to respond.
   * Current voice options are `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`,
   * `onyx`, `nova`, `sage`, `shimmer`, and `verse`.
   */
  voice?: VoiceIdsShared;
  /**
   * The set of modalities the model used to respond. If there are multiple modalities,
   * the model will pick one, for example if `modalities` is `["text", "audio"]`, the model
   * could be responding in either text or audio.
   */
  modalities?: ("text" | "audio")[];
  /** The format of output audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`. */
  output_audio_format?: "pcm16" | "g711_ulaw" | "g711_alaw";
  /** Sampling temperature for the model, limited to [0.6, 1.2]. Defaults to 0.8. */
  temperature?: number;
  /**
   * Maximum number of output tokens for a single assistant response,
   * inclusive of tool calls, that was used in this response.
   */
  max_output_tokens?: number | "inf";
}

/** Create a new Realtime response with these parameters */
export interface RealtimeResponseCreateParams {
  /**
   * The set of modalities the model can respond with. To disable audio,
   * set this to ["text"].
   */
  modalities?: ("text" | "audio")[];
  /**
   * The default system instructions (i.e. system message) prepended to model
   * calls. This field allows the client to guide the model on desired
   * responses. The model can be instructed on response content and format,
   * (e.g. "be extremely succinct", "act friendly", "here are examples of good
   * responses") and on audio behavior (e.g. "talk quickly", "inject emotion
   * into your voice", "laugh frequently"). The instructions are not guaranteed
   * to be followed by the model, but they provide guidance to the model on the
   * desired behavior.
   *
   * Note that the server sets default instructions which will be used if this
   * field is not set and are visible in the `session.created` event at the
   * start of the session.
   */
  instructions?: string;
  /**
   * The voice the model uses to respond. Voice cannot be changed during the
   * session once the model has responded with audio at least once. Current
   * voice options are `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`,
   * `onyx`, `nova`, `sage`, `shimmer`, and `verse`.
   */
  voice?: VoiceIdsShared;
  /** The format of output audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`. */
  output_audio_format?: "pcm16" | "g711_ulaw" | "g711_alaw";
  /** Tools (functions) available to the model. */
  tools?: {
    /** The type of the tool, i.e. `function`. */
    type?: "function";
    /** The name of the function. */
    name?: string;
    /**
     * The description of the function, including guidance on when and how
     * to call it, and guidance about what to tell the user when calling
     * (if anything).
     */
    description?: string;
    /** Parameters of the function in JSON Schema. */
    parameters?: object;
  }[];
  /**
   * How the model chooses tools. Options are `auto`, `none`, `required`, or
   * specify a function, like `{"type": "function", "function": {"name": "my_function"}}`.
   */
  tool_choice?: string;
  /** Sampling temperature for the model, limited to [0.6, 1.2]. Defaults to 0.8. */
  temperature?: number;
  /**
   * Maximum number of output tokens for a single assistant response,
   * inclusive of tool calls. Provide an integer between 1 and 4096 to
   * limit output tokens, or `inf` for the maximum available tokens for a
   * given model. Defaults to `inf`.
   */
  max_response_output_tokens?: number | "inf";
  /**
   * Controls which conversation the response is added to. Currently supports
   * `auto` and `none`, with `auto` as the default value. The `auto` value
   * means that the contents of the response will be added to the default
   * conversation. Set this to `none` to create an out-of-band response which
   * will not add items to default conversation.
   */
  conversation?: string | "auto" | "none";
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
  /**
   * Input items to include in the prompt for the model. Using this field
   * creates a new context for this Response instead of using the default
   * conversation. An empty array `[]` will clear the context for this Response.
   * Note that this can include references to items from the default conversation.
   */
  input?: RealtimeConversationItemWithReference[];
}

/** A realtime server event. */
export type RealtimeServerEvent =
  | RealtimeServerEventConversationCreated
  | RealtimeServerEventConversationItemCreated
  | RealtimeServerEventConversationItemDeleted
  | RealtimeServerEventConversationItemInputAudioTranscriptionCompleted
  | RealtimeServerEventConversationItemInputAudioTranscriptionDelta
  | RealtimeServerEventConversationItemInputAudioTranscriptionFailed
  | RealtimeServerEventConversationItemRetrieved
  | RealtimeServerEventConversationItemTruncated
  | RealtimeServerEventError
  | RealtimeServerEventInputAudioBufferCleared
  | RealtimeServerEventInputAudioBufferCommitted
  | RealtimeServerEventInputAudioBufferSpeechStarted
  | RealtimeServerEventInputAudioBufferSpeechStopped
  | RealtimeServerEventRateLimitsUpdated
  | RealtimeServerEventResponseAudioDelta
  | RealtimeServerEventResponseAudioDone
  | RealtimeServerEventResponseAudioTranscriptDelta
  | RealtimeServerEventResponseAudioTranscriptDone
  | RealtimeServerEventResponseContentPartAdded
  | RealtimeServerEventResponseContentPartDone
  | RealtimeServerEventResponseCreated
  | RealtimeServerEventResponseDone
  | RealtimeServerEventResponseFunctionCallArgumentsDelta
  | RealtimeServerEventResponseFunctionCallArgumentsDone
  | RealtimeServerEventResponseOutputItemAdded
  | RealtimeServerEventResponseOutputItemDone
  | RealtimeServerEventResponseTextDelta
  | RealtimeServerEventResponseTextDone
  | RealtimeServerEventSessionCreated
  | RealtimeServerEventSessionUpdated
  | RealtimeServerEventTranscriptionSessionUpdated
  | RealtimeServerEventOutputAudioBufferStarted
  | RealtimeServerEventOutputAudioBufferStopped
  | RealtimeServerEventOutputAudioBufferCleared;

/** Returned when a conversation is created. Emitted right after session creation. */
export interface RealtimeServerEventConversationCreated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.created`. */
  type: "conversation.created";
  /** The conversation resource. */
  conversation: {
    /** The unique ID of the conversation. */
    id?: string;
    /** The object type, must be `realtime.conversation`. */
    object?: string;
  };
}

/**
 * Returned when a conversation item is created. There are several scenarios that produce this event:
 *   - The server is generating a Response, which if successful will produce
 *     either one or two Items, which will be of type `message`
 *     (role `assistant`) or type `function_call`.
 *   - The input audio buffer has been committed, either by the client or the
 *     server (in `server_vad` mode). The server will take the content of the
 *     input audio buffer and add it to a new user message Item.
 *   - The client has sent a `conversation.item.create` event to add a new Item
 *     to the Conversation.
 */
export interface RealtimeServerEventConversationItemCreated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.created`. */
  type: "conversation.item.created";
  /**
   * The ID of the preceding item in the Conversation context, allows the
   * client to understand the order of the conversation.
   */
  previous_item_id: string;
  /** The item to add to the conversation. */
  item: RealtimeConversationItem;
}

/**
 * Returned when an item in the conversation is deleted by the client with a
 * `conversation.item.delete` event. This event is used to synchronize the
 * server's understanding of the conversation history with the client's view.
 */
export interface RealtimeServerEventConversationItemDeleted {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.deleted`. */
  type: "conversation.item.deleted";
  /** The ID of the item that was deleted. */
  item_id: string;
}

/**
 * This event is the output of audio transcription for user audio written to the
 * user audio buffer. Transcription begins when the input audio buffer is
 * committed by the client or server (in `server_vad` mode). Transcription runs
 * asynchronously with Response creation, so this event may come before or after
 * the Response events.
 *
 * Realtime API models accept audio natively, and thus input transcription is a
 * separate process run on a separate ASR (Automatic Speech Recognition) model.
 * The transcript may diverge somewhat from the model's interpretation, and
 * should be treated as a rough guide.
 */
export interface RealtimeServerEventConversationItemInputAudioTranscriptionCompleted {
  /** The unique ID of the server event. */
  event_id: string;
  /**
   * The event type, must be
   * `conversation.item.input_audio_transcription.completed`.
   */
  type: "conversation.item.input_audio_transcription.completed";
  /** The ID of the user message item containing the audio. */
  item_id: string;
  /** The index of the content part containing the audio. */
  content_index: number;
  /** The transcribed text. */
  transcript: string;
  /** The log probabilities of the transcription. */
  logprobs?: LogProbProperties[] | null;
  /** Usage statistics for the transcription. */
  usage: TranscriptTextUsageTokens | TranscriptTextUsageDuration;
}

/** Returned when the text value of an input audio transcription content part is updated. */
export interface RealtimeServerEventConversationItemInputAudioTranscriptionDelta {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.input_audio_transcription.delta`. */
  type: "conversation.item.input_audio_transcription.delta";
  /** The ID of the item. */
  item_id: string;
  /** The index of the content part in the item's content array. */
  content_index?: number;
  /** The text delta. */
  delta?: string;
  /** The log probabilities of the transcription. */
  logprobs?: LogProbProperties[] | null;
}

/**
 * Returned when input audio transcription is configured, and a transcription
 * request for a user message failed. These events are separate from other
 * `error` events so that the client can identify the related Item.
 */
export interface RealtimeServerEventConversationItemInputAudioTranscriptionFailed {
  /** The unique ID of the server event. */
  event_id: string;
  /**
   * The event type, must be
   * `conversation.item.input_audio_transcription.failed`.
   */
  type: "conversation.item.input_audio_transcription.failed";
  /** The ID of the user message item. */
  item_id: string;
  /** The index of the content part containing the audio. */
  content_index: number;
  /** Details of the transcription error. */
  error: {
    /** The type of error. */
    type?: string;
    /** Error code, if any. */
    code?: string;
    /** A human-readable error message. */
    message?: string;
    /** Parameter related to the error, if any. */
    param?: string;
  };
}

/** Returned when a conversation item is retrieved with `conversation.item.retrieve`. */
export interface RealtimeServerEventConversationItemRetrieved {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.retrieved`. */
  type: "conversation.item.retrieved";
  /** The item to add to the conversation. */
  item: RealtimeConversationItem;
}

/**
 * Returned when an earlier assistant audio message item is truncated by the
 * client with a `conversation.item.truncate` event. This event is used to
 * synchronize the server's understanding of the audio with the client's playback.
 *
 * This action will truncate the audio and remove the server-side text transcript
 * to ensure there is no text in the context that hasn't been heard by the user.
 */
export interface RealtimeServerEventConversationItemTruncated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `conversation.item.truncated`. */
  type: "conversation.item.truncated";
  /** The ID of the assistant message item that was truncated. */
  item_id: string;
  /** The index of the content part that was truncated. */
  content_index: number;
  /** The duration up to which the audio was truncated, in milliseconds. */
  audio_end_ms: number;
}

/**
 * Returned when an error occurs, which could be a client problem or a server
 * problem. Most errors are recoverable and the session will stay open, we
 * recommend to implementors to monitor and log error messages by default.
 */
export interface RealtimeServerEventError {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `error`. */
  type: "error";
  /** Details of the error. */
  error: {
    /** The type of error (e.g., "invalid_request_error", "server_error"). */
    type: string;
    /** Error code, if any. */
    code?: string | null;
    /** A human-readable error message. */
    message: string;
    /** Parameter related to the error, if any. */
    param?: string | null;
    /** The event_id of the client event that caused the error, if applicable. */
    event_id?: string | null;
  };
}

/**
 * Returned when the input audio buffer is cleared by the client with a
 * `input_audio_buffer.clear` event.
 */
export interface RealtimeServerEventInputAudioBufferCleared {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.cleared`. */
  type: "input_audio_buffer.cleared";
}

/**
 * Returned when an input audio buffer is committed, either by the client or
 * automatically in server VAD mode. The `item_id` property is the ID of the user
 * message item that will be created, thus a `conversation.item.created` event
 * will also be sent to the client.
 */
export interface RealtimeServerEventInputAudioBufferCommitted {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.committed`. */
  type: "input_audio_buffer.committed";
  /** The ID of the preceding item after which the new item will be inserted. */
  previous_item_id: string;
  /** The ID of the user message item that will be created. */
  item_id: string;
}

/**
 * Sent by the server when in `server_vad` mode to indicate that speech has been
 * detected in the audio buffer. This can happen any time audio is added to the
 * buffer (unless speech is already detected). The client may want to use this
 * event to interrupt audio playback or provide visual feedback to the user.
 *
 * The client should expect to receive a `input_audio_buffer.speech_stopped` event
 * when speech stops. The `item_id` property is the ID of the user message item
 * that will be created when speech stops and will also be included in the
 * `input_audio_buffer.speech_stopped` event (unless the client manually commits
 * the audio buffer during VAD activation).
 */
export interface RealtimeServerEventInputAudioBufferSpeechStarted {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.speech_started`. */
  type: "input_audio_buffer.speech_started";
  /**
   * Milliseconds from the start of all audio written to the buffer during the
   * session when speech was first detected. This will correspond to the
   * beginning of audio sent to the model, and thus includes the
   * `prefix_padding_ms` configured in the Session.
   */
  audio_start_ms: number;
  /** The ID of the user message item that will be created when speech stops. */
  item_id: string;
}

/**
 * Returned in `server_vad` mode when the server detects the end of speech in
 * the audio buffer. The server will also send an `conversation.item.created`
 * event with the user message item that is created from the audio buffer.
 */
export interface RealtimeServerEventInputAudioBufferSpeechStopped {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `input_audio_buffer.speech_stopped`. */
  type: "input_audio_buffer.speech_stopped";
  /**
   * Milliseconds since the session started when speech stopped. This will
   * correspond to the end of audio sent to the model, and thus includes the
   * `min_silence_duration_ms` configured in the Session.
   */
  audio_end_ms: number;
  /** The ID of the user message item that will be created. */
  item_id: string;
}

/**
 * **WebRTC Only:** Emitted when the output audio buffer is cleared. This happens either in VAD
 * mode when the user has interrupted (`input_audio_buffer.speech_started`),
 * or when the client has emitted the `output_audio_buffer.clear` event to manually
 * cut off the current audio response.
 * [Learn more](/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).
 */
export interface RealtimeServerEventOutputAudioBufferCleared {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `output_audio_buffer.cleared`. */
  type: "output_audio_buffer.cleared";
  /** The unique ID of the response that produced the audio. */
  response_id: string;
}

/**
 * **WebRTC Only:** Emitted when the server begins streaming audio to the client. This event is
 * emitted after an audio content part has been added (`response.content_part.added`)
 * to the response.
 * [Learn more](/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).
 */
export interface RealtimeServerEventOutputAudioBufferStarted {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `output_audio_buffer.started`. */
  type: "output_audio_buffer.started";
  /** The unique ID of the response that produced the audio. */
  response_id: string;
}

/**
 * **WebRTC Only:** Emitted when the output audio buffer has been completely drained on the server,
 * and no more audio is forthcoming. This event is emitted after the full response
 * data has been sent to the client (`response.done`).
 * [Learn more](/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).
 */
export interface RealtimeServerEventOutputAudioBufferStopped {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `output_audio_buffer.stopped`. */
  type: "output_audio_buffer.stopped";
  /** The unique ID of the response that produced the audio. */
  response_id: string;
}

/**
 * Emitted at the beginning of a Response to indicate the updated rate limits.
 * When a Response is created some tokens will be "reserved" for the output
 * tokens, the rate limits shown here reflect that reservation, which is then
 * adjusted accordingly once the Response is completed.
 */
export interface RealtimeServerEventRateLimitsUpdated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `rate_limits.updated`. */
  type: "rate_limits.updated";
  /** List of rate limit information. */
  rate_limits: {
    /** The name of the rate limit (`requests`, `tokens`). */
    name?: "requests" | "tokens";
    /** The maximum allowed value for the rate limit. */
    limit?: number;
    /** The remaining value before the limit is reached. */
    remaining?: number;
    /** Seconds until the rate limit resets. */
    reset_seconds?: number;
  }[];
}

/** Returned when the model-generated audio is updated. */
export interface RealtimeServerEventResponseAudioDelta {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.audio.delta`. */
  type: "response.audio.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** Base64-encoded audio data delta. */
  delta: string;
}

/**
 * Returned when the model-generated audio is done. Also emitted when a Response
 * is interrupted, incomplete, or cancelled.
 */
export interface RealtimeServerEventResponseAudioDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.audio.done`. */
  type: "response.audio.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
}

/** Returned when the model-generated transcription of audio output is updated. */
export interface RealtimeServerEventResponseAudioTranscriptDelta {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.audio_transcript.delta`. */
  type: "response.audio_transcript.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The transcript delta. */
  delta: string;
}

/**
 * Returned when the model-generated transcription of audio output is done
 * streaming. Also emitted when a Response is interrupted, incomplete, or
 * cancelled.
 */
export interface RealtimeServerEventResponseAudioTranscriptDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.audio_transcript.done`. */
  type: "response.audio_transcript.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The final transcript of the audio. */
  transcript: string;
}

/**
 * Returned when a new content part is added to an assistant message item during
 * response generation.
 */
export interface RealtimeServerEventResponseContentPartAdded {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.content_part.added`. */
  type: "response.content_part.added";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item to which the content part was added. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The content part that was added. */
  part: {
    /** The content type ("text", "audio"). */
    type?: "audio" | "text";
    /** The text content (if type is "text"). */
    text?: string;
    /** Base64-encoded audio data (if type is "audio"). */
    audio?: string;
    /** The transcript of the audio (if type is "audio"). */
    transcript?: string;
  };
}

/**
 * Returned when a content part is done streaming in an assistant message item.
 * Also emitted when a Response is interrupted, incomplete, or cancelled.
 */
export interface RealtimeServerEventResponseContentPartDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.content_part.done`. */
  type: "response.content_part.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The content part that is done. */
  part: {
    /** The content type ("text", "audio"). */
    type?: "audio" | "text";
    /** The text content (if type is "text"). */
    text?: string;
    /** Base64-encoded audio data (if type is "audio"). */
    audio?: string;
    /** The transcript of the audio (if type is "audio"). */
    transcript?: string;
  };
}

/**
 * Returned when a new Response is created. The first event of response creation,
 * where the response is in an initial state of `in_progress`.
 */
export interface RealtimeServerEventResponseCreated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.created`. */
  type: "response.created";
  /** The response resource. */
  response: RealtimeResponse;
}

/**
 * Returned when a Response is done streaming. Always emitted, no matter the
 * final state. The Response object included in the `response.done` event will
 * include all output Items in the Response but will omit the raw audio data.
 */
export interface RealtimeServerEventResponseDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.done`. */
  type: "response.done";
  /** The response resource. */
  response: RealtimeResponse;
}

/** Returned when the model-generated function call arguments are updated. */
export interface RealtimeServerEventResponseFunctionCallArgumentsDelta {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.function_call_arguments.delta`. */
  type: "response.function_call_arguments.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the function call item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The ID of the function call. */
  call_id: string;
  /** The arguments delta as a JSON string. */
  delta: string;
}

/**
 * Returned when the model-generated function call arguments are done streaming.
 * Also emitted when a Response is interrupted, incomplete, or cancelled.
 */
export interface RealtimeServerEventResponseFunctionCallArgumentsDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.function_call_arguments.done`. */
  type: "response.function_call_arguments.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the function call item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The ID of the function call. */
  call_id: string;
  /** The final arguments as a JSON string. */
  arguments: string;
}

/** Returned when a new Item is created during Response generation. */
export interface RealtimeServerEventResponseOutputItemAdded {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_item.added`. */
  type: "response.output_item.added";
  /** The ID of the Response to which the item belongs. */
  response_id: string;
  /** The index of the output item in the Response. */
  output_index: number;
  /** The item to add to the conversation. */
  item: RealtimeConversationItem;
}

/**
 * Returned when an Item is done streaming. Also emitted when a Response is
 * interrupted, incomplete, or cancelled.
 */
export interface RealtimeServerEventResponseOutputItemDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.output_item.done`. */
  type: "response.output_item.done";
  /** The ID of the Response to which the item belongs. */
  response_id: string;
  /** The index of the output item in the Response. */
  output_index: number;
  /** The item to add to the conversation. */
  item: RealtimeConversationItem;
}

/** Returned when the text value of a "text" content part is updated. */
export interface RealtimeServerEventResponseTextDelta {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.text.delta`. */
  type: "response.text.delta";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The text delta. */
  delta: string;
}

/**
 * Returned when the text value of a "text" content part is done streaming. Also
 * emitted when a Response is interrupted, incomplete, or cancelled.
 */
export interface RealtimeServerEventResponseTextDone {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `response.text.done`. */
  type: "response.text.done";
  /** The ID of the response. */
  response_id: string;
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item in the response. */
  output_index: number;
  /** The index of the content part in the item's content array. */
  content_index: number;
  /** The final text content. */
  text: string;
}

/**
 * Returned when a Session is created. Emitted automatically when a new
 * connection is established as the first server event. This event will contain
 * the default Session configuration.
 */
export interface RealtimeServerEventSessionCreated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `session.created`. */
  type: "session.created";
  /** Realtime session object configuration. */
  session: RealtimeSession;
}

/**
 * Returned when a session is updated with a `session.update` event, unless
 * there is an error.
 */
export interface RealtimeServerEventSessionUpdated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `session.updated`. */
  type: "session.updated";
  /** Realtime session object configuration. */
  session: RealtimeSession;
}

/**
 * Returned when a transcription session is updated with a `transcription_session.update` event, unless
 * there is an error.
 */
export interface RealtimeServerEventTranscriptionSessionUpdated {
  /** The unique ID of the server event. */
  event_id: string;
  /** The event type, must be `transcription_session.updated`. */
  type: "transcription_session.updated";
  /**
   * A new Realtime transcription session configuration.
   *
   * When a session is created on the server via REST API, the session object
   * also contains an ephemeral key. Default TTL for keys is 10 minutes. This
   * property is not present when a session is updated via the WebSocket API.
   */
  session: RealtimeTranscriptionSessionCreateResponse;
}

/** Realtime session object configuration. */
export interface RealtimeSession {
  /** Unique identifier for the session that looks like `sess_1234567890abcdef`. */
  id?: string;
  /**
   * The set of modalities the model can respond with. To disable audio,
   * set this to ["text"].
   */
  modalities?: ("text" | "audio")[];
  /** The Realtime model used for this session. */
  model?:
    | "gpt-4o-realtime-preview"
    | "gpt-4o-realtime-preview-2024-10-01"
    | "gpt-4o-realtime-preview-2024-12-17"
    | "gpt-4o-realtime-preview-2025-06-03"
    | "gpt-4o-mini-realtime-preview"
    | "gpt-4o-mini-realtime-preview-2024-12-17";
  /**
   * The default system instructions (i.e. system message) prepended to model
   * calls. This field allows the client to guide the model on desired
   * responses. The model can be instructed on response content and format,
   * (e.g. "be extremely succinct", "act friendly", "here are examples of good
   * responses") and on audio behavior (e.g. "talk quickly", "inject emotion
   * into your voice", "laugh frequently"). The instructions are not
   * guaranteed to be followed by the model, but they provide guidance to the
   * model on the desired behavior.
   *
   *
   * Note that the server sets default instructions which will be used if this
   * field is not set and are visible in the `session.created` event at the
   * start of the session.
   */
  instructions?: string;
  /**
   * The voice the model uses to respond. Voice cannot be changed during the
   * session once the model has responded with audio at least once. Current
   * voice options are `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`,
   * `onyx`, `nova`, `sage`, `shimmer`, and `verse`.
   */
  voice?: VoiceIdsShared;
  /**
   * The format of input audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
   * For `pcm16`, input audio must be 16-bit PCM at a 24kHz sample rate,
   * single channel (mono), and little-endian byte order.
   * @default "pcm16"
   */
  input_audio_format?: "pcm16" | "g711_ulaw" | "g711_alaw";
  /**
   * The format of output audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
   * For `pcm16`, output audio is sampled at a rate of 24kHz.
   * @default "pcm16"
   */
  output_audio_format?: "pcm16" | "g711_ulaw" | "g711_alaw";
  /** Configuration for input audio transcription, defaults to off and can be  set to `null` to turn off once on. Input audio transcription is not native to the model, since the model consumes audio directly. Transcription runs  asynchronously through [the /audio/transcriptions endpoint](https://platform.openai.com/docs/api-reference/audio/createTranscription) and should be treated as guidance of input audio content rather than precisely what the model heard. The client can optionally set the language and prompt for transcription, these offer additional guidance to the transcription service. */
  input_audio_transcription?: {
    /** The model to use for transcription, current options are `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `whisper-1`. */
    model?: string;
    /**
     * The language of the input audio. Supplying the input language in
     * [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format
     * will improve accuracy and latency.
     */
    language?: string;
    /**
     * An optional text to guide the model's style or continue a previous audio
     * segment.
     * For `whisper-1`, the [prompt is a list of keywords](/docs/guides/speech-to-text#prompting).
     * For `gpt-4o-transcribe` models, the prompt is a free text string, for example "expect words related to technology".
     */
    prompt?: string;
  };
  /**
   * Configuration for turn detection, ether Server VAD or Semantic VAD. This can be set to `null` to turn off, in which case the client must manually trigger model response.
   * Server VAD means that the model will detect the start and end of speech based on audio volume and respond at the end of user speech.
   * Semantic VAD is more advanced and uses a turn detection model (in conjuction with VAD) to semantically estimate whether the user has finished speaking, then dynamically sets a timeout based on this probability. For example, if user audio trails off with "uhhm", the model will score a low probability of turn end and wait longer for the user to continue speaking. This can be useful for more natural conversations, but may have a higher latency.
   */
  turn_detection?: {
    /**
     * Type of turn detection.
     * @default "server_vad"
     */
    type?: "server_vad" | "semantic_vad";
    /**
     * Used only for `semantic_vad` mode. The eagerness of the model to respond. `low` will wait longer for the user to continue speaking, `high` will respond more quickly. `auto` is the default and is equivalent to `medium`.
     * @default "auto"
     */
    eagerness?: "low" | "medium" | "high" | "auto";
    /**
     * Used only for `server_vad` mode. Activation threshold for VAD (0.0 to 1.0), this defaults to 0.5. A
     * higher threshold will require louder audio to activate the model, and
     * thus might perform better in noisy environments.
     */
    threshold?: number;
    /**
     * Used only for `server_vad` mode. Amount of audio to include before the VAD detected speech (in
     * milliseconds). Defaults to 300ms.
     */
    prefix_padding_ms?: number;
    /**
     * Used only for `server_vad` mode. Duration of silence to detect speech stop (in milliseconds). Defaults
     * to 500ms. With shorter values the model will respond more quickly,
     * but may jump in on short pauses from the user.
     */
    silence_duration_ms?: number;
    /**
     * Whether or not to automatically generate a response when a VAD stop event occurs.
     * @default true
     */
    create_response?: boolean;
    /**
     * Whether or not to automatically interrupt any ongoing response with output to the default
     * conversation (i.e. `conversation` of `auto`) when a VAD start event occurs.
     * @default true
     */
    interrupt_response?: boolean;
  };
  /**
   * Configuration for input audio noise reduction. This can be set to `null` to turn off.
   * Noise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.
   * Filtering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.
   * @default null
   */
  input_audio_noise_reduction?: {
    /** Type of noise reduction. `near_field` is for close-talking microphones such as headphones, `far_field` is for far-field microphones such as laptop or conference room microphones. */
    type?: "near_field" | "far_field";
  };
  /**
   * The speed of the model's spoken response. 1.0 is the default speed. 0.25 is
   * the minimum speed. 1.5 is the maximum speed. This value can only be changed
   * in between model turns, not while a response is in progress.
   * @min 0.25
   * @max 1.5
   * @default 1
   */
  speed?: number;
  /**
   * Tracing Configuration
   * Configuration options for tracing. Set to null to disable tracing. Once
   * tracing is enabled for a session, the configuration cannot be modified.
   *
   * `auto` will create a trace for the session with default values for the
   * workflow name, group id, and metadata.
   */
  tracing?:
    | "auto"
    | {
        /**
         * The name of the workflow to attach to this trace. This is used to
         * name the trace in the traces dashboard.
         */
        workflow_name?: string;
        /**
         * The group id to attach to this trace to enable filtering and
         * grouping in the traces dashboard.
         */
        group_id?: string;
        /**
         * The arbitrary metadata to attach to this trace to enable
         * filtering in the traces dashboard.
         */
        metadata?: object;
      };
  /** Tools (functions) available to the model. */
  tools?: {
    /** The type of the tool, i.e. `function`. */
    type?: "function";
    /** The name of the function. */
    name?: string;
    /**
     * The description of the function, including guidance on when and how
     * to call it, and guidance about what to tell the user when calling
     * (if anything).
     */
    description?: string;
    /** Parameters of the function in JSON Schema. */
    parameters?: object;
  }[];
  /**
   * How the model chooses tools. Options are `auto`, `none`, `required`, or
   * specify a function.
   * @default "auto"
   */
  tool_choice?: string;
  /**
   * Sampling temperature for the model, limited to [0.6, 1.2]. For audio models a temperature of 0.8 is highly recommended for best performance.
   * @default 0.8
   */
  temperature?: number;
  /**
   * Maximum number of output tokens for a single assistant response,
   * inclusive of tool calls. Provide an integer between 1 and 4096 to
   * limit output tokens, or `inf` for the maximum available tokens for a
   * given model. Defaults to `inf`.
   */
  max_response_output_tokens?: number | "inf";
}

/** Realtime session object configuration. */
export interface RealtimeSessionCreateRequest {
  /**
   * The set of modalities the model can respond with. To disable audio,
   * set this to ["text"].
   */
  modalities?: ("text" | "audio")[];
  /** The Realtime model used for this session. */
  model?:
    | "gpt-4o-realtime-preview"
    | "gpt-4o-realtime-preview-2024-10-01"
    | "gpt-4o-realtime-preview-2024-12-17"
    | "gpt-4o-realtime-preview-2025-06-03"
    | "gpt-4o-mini-realtime-preview"
    | "gpt-4o-mini-realtime-preview-2024-12-17";
  /**
   * The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. "be extremely succinct", "act friendly", "here are examples of good responses") and on audio behavior (e.g. "talk quickly", "inject emotion into your voice", "laugh frequently"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.
   *
   * Note that the server sets default instructions which will be used if this field is not set and are visible in the `session.created` event at the start of the session.
   */
  instructions?: string;
  /**
   * The voice the model uses to respond. Voice cannot be changed during the
   * session once the model has responded with audio at least once. Current
   * voice options are `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`,
   * `onyx`, `nova`, `sage`, `shimmer`, and `verse`.
   */
  voice?: VoiceIdsShared;
  /**
   * The format of input audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
   * For `pcm16`, input audio must be 16-bit PCM at a 24kHz sample rate,
   * single channel (mono), and little-endian byte order.
   * @default "pcm16"
   */
  input_audio_format?: "pcm16" | "g711_ulaw" | "g711_alaw";
  /**
   * The format of output audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
   * For `pcm16`, output audio is sampled at a rate of 24kHz.
   * @default "pcm16"
   */
  output_audio_format?: "pcm16" | "g711_ulaw" | "g711_alaw";
  /** Configuration for input audio transcription, defaults to off and can be set to `null` to turn off once on. Input audio transcription is not native to the model, since the model consumes audio directly. Transcription runs asynchronously through [the /audio/transcriptions endpoint](https://platform.openai.com/docs/api-reference/audio/createTranscription) and should be treated as guidance of input audio content rather than precisely what the model heard. The client can optionally set the language and prompt for transcription, these offer additional guidance to the transcription service. */
  input_audio_transcription?: {
    /** The model to use for transcription, current options are `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `whisper-1`. */
    model?: string;
    /**
     * The language of the input audio. Supplying the input language in
     * [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format
     * will improve accuracy and latency.
     */
    language?: string;
    /**
     * An optional text to guide the model's style or continue a previous audio
     * segment.
     * For `whisper-1`, the [prompt is a list of keywords](/docs/guides/speech-to-text#prompting).
     * For `gpt-4o-transcribe` models, the prompt is a free text string, for example "expect words related to technology".
     */
    prompt?: string;
  };
  /**
   * Configuration for turn detection, ether Server VAD or Semantic VAD. This can be set to `null` to turn off, in which case the client must manually trigger model response.
   * Server VAD means that the model will detect the start and end of speech based on audio volume and respond at the end of user speech.
   * Semantic VAD is more advanced and uses a turn detection model (in conjuction with VAD) to semantically estimate whether the user has finished speaking, then dynamically sets a timeout based on this probability. For example, if user audio trails off with "uhhm", the model will score a low probability of turn end and wait longer for the user to continue speaking. This can be useful for more natural conversations, but may have a higher latency.
   */
  turn_detection?: {
    /**
     * Type of turn detection.
     * @default "server_vad"
     */
    type?: "server_vad" | "semantic_vad";
    /**
     * Used only for `semantic_vad` mode. The eagerness of the model to respond. `low` will wait longer for the user to continue speaking, `high` will respond more quickly. `auto` is the default and is equivalent to `medium`.
     * @default "auto"
     */
    eagerness?: "low" | "medium" | "high" | "auto";
    /**
     * Used only for `server_vad` mode. Activation threshold for VAD (0.0 to 1.0), this defaults to 0.5. A
     * higher threshold will require louder audio to activate the model, and
     * thus might perform better in noisy environments.
     */
    threshold?: number;
    /**
     * Used only for `server_vad` mode. Amount of audio to include before the VAD detected speech (in
     * milliseconds). Defaults to 300ms.
     */
    prefix_padding_ms?: number;
    /**
     * Used only for `server_vad` mode. Duration of silence to detect speech stop (in milliseconds). Defaults
     * to 500ms. With shorter values the model will respond more quickly,
     * but may jump in on short pauses from the user.
     */
    silence_duration_ms?: number;
    /**
     * Whether or not to automatically generate a response when a VAD stop event occurs.
     * @default true
     */
    create_response?: boolean;
    /**
     * Whether or not to automatically interrupt any ongoing response with output to the default
     * conversation (i.e. `conversation` of `auto`) when a VAD start event occurs.
     * @default true
     */
    interrupt_response?: boolean;
  };
  /**
   * Configuration for input audio noise reduction. This can be set to `null` to turn off.
   * Noise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.
   * Filtering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.
   * @default null
   */
  input_audio_noise_reduction?: {
    /** Type of noise reduction. `near_field` is for close-talking microphones such as headphones, `far_field` is for far-field microphones such as laptop or conference room microphones. */
    type?: "near_field" | "far_field";
  };
  /**
   * The speed of the model's spoken response. 1.0 is the default speed. 0.25 is
   * the minimum speed. 1.5 is the maximum speed. This value can only be changed
   * in between model turns, not while a response is in progress.
   * @min 0.25
   * @max 1.5
   * @default 1
   */
  speed?: number;
  /**
   * Tracing Configuration
   * Configuration options for tracing. Set to null to disable tracing. Once
   * tracing is enabled for a session, the configuration cannot be modified.
   *
   * `auto` will create a trace for the session with default values for the
   * workflow name, group id, and metadata.
   */
  tracing?:
    | "auto"
    | {
        /**
         * The name of the workflow to attach to this trace. This is used to
         * name the trace in the traces dashboard.
         */
        workflow_name?: string;
        /**
         * The group id to attach to this trace to enable filtering and
         * grouping in the traces dashboard.
         */
        group_id?: string;
        /**
         * The arbitrary metadata to attach to this trace to enable
         * filtering in the traces dashboard.
         */
        metadata?: object;
      };
  /** Tools (functions) available to the model. */
  tools?: {
    /** The type of the tool, i.e. `function`. */
    type?: "function";
    /** The name of the function. */
    name?: string;
    /**
     * The description of the function, including guidance on when and how
     * to call it, and guidance about what to tell the user when calling
     * (if anything).
     */
    description?: string;
    /** Parameters of the function in JSON Schema. */
    parameters?: object;
  }[];
  /**
   * How the model chooses tools. Options are `auto`, `none`, `required`, or
   * specify a function.
   * @default "auto"
   */
  tool_choice?: string;
  /**
   * Sampling temperature for the model, limited to [0.6, 1.2]. For audio models a temperature of 0.8 is highly recommended for best performance.
   * @default 0.8
   */
  temperature?: number;
  /**
   * Maximum number of output tokens for a single assistant response,
   * inclusive of tool calls. Provide an integer between 1 and 4096 to
   * limit output tokens, or `inf` for the maximum available tokens for a
   * given model. Defaults to `inf`.
   */
  max_response_output_tokens?: number | "inf";
  /** Configuration options for the generated client secret. */
  client_secret?: {
    /** Configuration for the ephemeral token expiration. */
    expires_after?: {
      /** The anchor point for the ephemeral token expiration. Only `created_at` is currently supported. */
      anchor: "created_at";
      /**
       * The number of seconds from the anchor point to the expiration. Select a value between `10` and `7200`.
       * @default 600
       */
      seconds?: number;
    };
  };
}

/**
 * A new Realtime session configuration, with an ephermeral key. Default TTL
 * for keys is one minute.
 */
export interface RealtimeSessionCreateResponse {
  /** Ephemeral key returned by the API. */
  client_secret: {
    /**
     * Ephemeral key usable in client environments to authenticate connections
     * to the Realtime API. Use this in client-side environments rather than
     * a standard API token, which should only be used server-side.
     */
    value: string;
    /**
     * Timestamp for when the token expires. Currently, all tokens expire
     * after one minute.
     */
    expires_at: number;
  };
  /**
   * The set of modalities the model can respond with. To disable audio,
   * set this to ["text"].
   */
  modalities?: ("text" | "audio")[];
  /**
   * The default system instructions (i.e. system message) prepended to model
   * calls. This field allows the client to guide the model on desired
   * responses. The model can be instructed on response content and format,
   * (e.g. "be extremely succinct", "act friendly", "here are examples of good
   * responses") and on audio behavior (e.g. "talk quickly", "inject emotion
   * into your voice", "laugh frequently"). The instructions are not guaranteed
   * to be followed by the model, but they provide guidance to the model on the
   * desired behavior.
   *
   * Note that the server sets default instructions which will be used if this
   * field is not set and are visible in the `session.created` event at the
   * start of the session.
   */
  instructions?: string;
  /**
   * The voice the model uses to respond. Voice cannot be changed during the
   * session once the model has responded with audio at least once. Current
   * voice options are `alloy`, `ash`, `ballad`, `coral`, `echo` `sage`,
   * `shimmer` and `verse`.
   */
  voice?: VoiceIdsShared;
  /** The format of input audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`. */
  input_audio_format?: string;
  /** The format of output audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`. */
  output_audio_format?: string;
  /**
   * Configuration for input audio transcription, defaults to off and can be
   * set to `null` to turn off once on. Input audio transcription is not native
   * to the model, since the model consumes audio directly. Transcription runs
   * asynchronously and should be treated as rough guidance
   * rather than the representation understood by the model.
   */
  input_audio_transcription?: {
    /** The model to use for transcription. */
    model?: string;
  };
  /**
   * The speed of the model's spoken response. 1.0 is the default speed. 0.25 is
   * the minimum speed. 1.5 is the maximum speed. This value can only be changed
   * in between model turns, not while a response is in progress.
   * @min 0.25
   * @max 1.5
   * @default 1
   */
  speed?: number;
  /**
   * Tracing Configuration
   * Configuration options for tracing. Set to null to disable tracing. Once
   * tracing is enabled for a session, the configuration cannot be modified.
   *
   * `auto` will create a trace for the session with default values for the
   * workflow name, group id, and metadata.
   */
  tracing?:
    | "auto"
    | {
        /**
         * The name of the workflow to attach to this trace. This is used to
         * name the trace in the traces dashboard.
         */
        workflow_name?: string;
        /**
         * The group id to attach to this trace to enable filtering and
         * grouping in the traces dashboard.
         */
        group_id?: string;
        /**
         * The arbitrary metadata to attach to this trace to enable
         * filtering in the traces dashboard.
         */
        metadata?: object;
      };
  /**
   * Configuration for turn detection. Can be set to `null` to turn off. Server
   * VAD means that the model will detect the start and end of speech based on
   * audio volume and respond at the end of user speech.
   */
  turn_detection?: {
    /** Type of turn detection, only `server_vad` is currently supported. */
    type?: string;
    /**
     * Activation threshold for VAD (0.0 to 1.0), this defaults to 0.5. A
     * higher threshold will require louder audio to activate the model, and
     * thus might perform better in noisy environments.
     */
    threshold?: number;
    /**
     * Amount of audio to include before the VAD detected speech (in
     * milliseconds). Defaults to 300ms.
     */
    prefix_padding_ms?: number;
    /**
     * Duration of silence to detect speech stop (in milliseconds). Defaults
     * to 500ms. With shorter values the model will respond more quickly,
     * but may jump in on short pauses from the user.
     */
    silence_duration_ms?: number;
  };
  /** Tools (functions) available to the model. */
  tools?: {
    /** The type of the tool, i.e. `function`. */
    type?: "function";
    /** The name of the function. */
    name?: string;
    /**
     * The description of the function, including guidance on when and how
     * to call it, and guidance about what to tell the user when calling
     * (if anything).
     */
    description?: string;
    /** Parameters of the function in JSON Schema. */
    parameters?: object;
  }[];
  /**
   * How the model chooses tools. Options are `auto`, `none`, `required`, or
   * specify a function.
   */
  tool_choice?: string;
  /** Sampling temperature for the model, limited to [0.6, 1.2]. Defaults to 0.8. */
  temperature?: number;
  /**
   * Maximum number of output tokens for a single assistant response,
   * inclusive of tool calls. Provide an integer between 1 and 4096 to
   * limit output tokens, or `inf` for the maximum available tokens for a
   * given model. Defaults to `inf`.
   */
  max_response_output_tokens?: number | "inf";
}

/** Realtime transcription session object configuration. */
export interface RealtimeTranscriptionSessionCreateRequest {
  /**
   * The set of modalities the model can respond with. To disable audio,
   * set this to ["text"].
   */
  modalities?: ("text" | "audio")[];
  /**
   * The format of input audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`.
   * For `pcm16`, input audio must be 16-bit PCM at a 24kHz sample rate,
   * single channel (mono), and little-endian byte order.
   * @default "pcm16"
   */
  input_audio_format?: "pcm16" | "g711_ulaw" | "g711_alaw";
  /** Configuration for input audio transcription. The client can optionally set the language and prompt for transcription, these offer additional guidance to the transcription service. */
  input_audio_transcription?: {
    /** The model to use for transcription, current options are `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, and `whisper-1`. */
    model?: "gpt-4o-transcribe" | "gpt-4o-mini-transcribe" | "whisper-1";
    /**
     * The language of the input audio. Supplying the input language in
     * [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format
     * will improve accuracy and latency.
     */
    language?: string;
    /**
     * An optional text to guide the model's style or continue a previous audio
     * segment.
     * For `whisper-1`, the [prompt is a list of keywords](/docs/guides/speech-to-text#prompting).
     * For `gpt-4o-transcribe` models, the prompt is a free text string, for example "expect words related to technology".
     */
    prompt?: string;
  };
  /**
   * Configuration for turn detection, ether Server VAD or Semantic VAD. This can be set to `null` to turn off, in which case the client must manually trigger model response.
   * Server VAD means that the model will detect the start and end of speech based on audio volume and respond at the end of user speech.
   * Semantic VAD is more advanced and uses a turn detection model (in conjuction with VAD) to semantically estimate whether the user has finished speaking, then dynamically sets a timeout based on this probability. For example, if user audio trails off with "uhhm", the model will score a low probability of turn end and wait longer for the user to continue speaking. This can be useful for more natural conversations, but may have a higher latency.
   */
  turn_detection?: {
    /**
     * Type of turn detection.
     * @default "server_vad"
     */
    type?: "server_vad" | "semantic_vad";
    /**
     * Used only for `semantic_vad` mode. The eagerness of the model to respond. `low` will wait longer for the user to continue speaking, `high` will respond more quickly. `auto` is the default and is equivalent to `medium`.
     * @default "auto"
     */
    eagerness?: "low" | "medium" | "high" | "auto";
    /**
     * Used only for `server_vad` mode. Activation threshold for VAD (0.0 to 1.0), this defaults to 0.5. A
     * higher threshold will require louder audio to activate the model, and
     * thus might perform better in noisy environments.
     */
    threshold?: number;
    /**
     * Used only for `server_vad` mode. Amount of audio to include before the VAD detected speech (in
     * milliseconds). Defaults to 300ms.
     */
    prefix_padding_ms?: number;
    /**
     * Used only for `server_vad` mode. Duration of silence to detect speech stop (in milliseconds). Defaults
     * to 500ms. With shorter values the model will respond more quickly,
     * but may jump in on short pauses from the user.
     */
    silence_duration_ms?: number;
    /**
     * Whether or not to automatically generate a response when a VAD stop event occurs. Not available for transcription sessions.
     * @default true
     */
    create_response?: boolean;
    /**
     * Whether or not to automatically interrupt any ongoing response with output to the default
     * conversation (i.e. `conversation` of `auto`) when a VAD start event occurs. Not available for transcription sessions.
     * @default true
     */
    interrupt_response?: boolean;
  };
  /**
   * Configuration for input audio noise reduction. This can be set to `null` to turn off.
   * Noise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.
   * Filtering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.
   * @default null
   */
  input_audio_noise_reduction?: {
    /** Type of noise reduction. `near_field` is for close-talking microphones such as headphones, `far_field` is for far-field microphones such as laptop or conference room microphones. */
    type?: "near_field" | "far_field";
  };
  /**
   * The set of items to include in the transcription. Current available items are:
   * - `item.input_audio_transcription.logprobs`
   */
  include?: string[];
  /** Configuration options for the generated client secret. */
  client_secret?: {
    /** Configuration for the ephemeral token expiration. */
    expires_at?: {
      /**
       * The anchor point for the ephemeral token expiration. Only `created_at` is currently supported.
       * @default "created_at"
       */
      anchor?: "created_at";
      /**
       * The number of seconds from the anchor point to the expiration. Select a value between `10` and `7200`.
       * @default 600
       */
      seconds?: number;
    };
  };
}

/**
 * A new Realtime transcription session configuration.
 *
 * When a session is created on the server via REST API, the session object
 * also contains an ephemeral key. Default TTL for keys is 10 minutes. This
 * property is not present when a session is updated via the WebSocket API.
 */
export interface RealtimeTranscriptionSessionCreateResponse {
  /**
   * Ephemeral key returned by the API. Only present when the session is
   * created on the server via REST API.
   */
  client_secret: {
    /**
     * Ephemeral key usable in client environments to authenticate connections
     * to the Realtime API. Use this in client-side environments rather than
     * a standard API token, which should only be used server-side.
     */
    value: string;
    /**
     * Timestamp for when the token expires. Currently, all tokens expire
     * after one minute.
     */
    expires_at: number;
  };
  /**
   * The set of modalities the model can respond with. To disable audio,
   * set this to ["text"].
   */
  modalities?: ("text" | "audio")[];
  /** The format of input audio. Options are `pcm16`, `g711_ulaw`, or `g711_alaw`. */
  input_audio_format?: string;
  /** Configuration of the transcription model. */
  input_audio_transcription?: {
    /** The model to use for transcription. Can be `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, or `whisper-1`. */
    model?: "gpt-4o-transcribe" | "gpt-4o-mini-transcribe" | "whisper-1";
    /**
     * The language of the input audio. Supplying the input language in
     * [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format
     * will improve accuracy and latency.
     */
    language?: string;
    /**
     * An optional text to guide the model's style or continue a previous audio
     * segment. The [prompt](/docs/guides/speech-to-text#prompting) should match
     * the audio language.
     */
    prompt?: string;
  };
  /**
   * Configuration for turn detection. Can be set to `null` to turn off. Server
   * VAD means that the model will detect the start and end of speech based on
   * audio volume and respond at the end of user speech.
   */
  turn_detection?: {
    /** Type of turn detection, only `server_vad` is currently supported. */
    type?: string;
    /**
     * Activation threshold for VAD (0.0 to 1.0), this defaults to 0.5. A
     * higher threshold will require louder audio to activate the model, and
     * thus might perform better in noisy environments.
     */
    threshold?: number;
    /**
     * Amount of audio to include before the VAD detected speech (in
     * milliseconds). Defaults to 300ms.
     */
    prefix_padding_ms?: number;
    /**
     * Duration of silence to detect speech stop (in milliseconds). Defaults
     * to 500ms. With shorter values the model will respond more quickly,
     * but may jump in on short pauses from the user.
     */
    silence_duration_ms?: number;
  };
}

/**
 * Reasoning
 * **o-series models only**
 *
 * Configuration options for
 * [reasoning models](https://platform.openai.com/docs/guides/reasoning).
 */
export interface Reasoning {
  /**
   * **o-series models only**
   *
   * Constrains effort on reasoning for
   * [reasoning models](https://platform.openai.com/docs/guides/reasoning).
   * Currently supported values are `low`, `medium`, and `high`. Reducing
   * reasoning effort can result in faster responses and fewer tokens used
   * on reasoning in a response.
   */
  effort?: ReasoningEffort;
  /**
   * A summary of the reasoning performed by the model. This can be
   * useful for debugging and understanding the model's reasoning process.
   * One of `auto`, `concise`, or `detailed`.
   */
  summary?: "auto" | "concise" | "detailed" | null;
  /**
   * **Deprecated:** use `summary` instead.
   *
   * A summary of the reasoning performed by the model. This can be
   * useful for debugging and understanding the model's reasoning process.
   * One of `auto`, `concise`, or `detailed`.
   * @deprecated
   */
  generate_summary?: "auto" | "concise" | "detailed" | null;
}

/**
 * **o-series models only**
 *
 * Constrains effort on reasoning for
 * [reasoning models](https://platform.openai.com/docs/guides/reasoning).
 * Currently supported values are `low`, `medium`, and `high`. Reducing
 * reasoning effort can result in faster responses and fewer tokens used
 * on reasoning in a response.
 * @default "medium"
 */
export type ReasoningEffort = "low" | "medium" | "high";

/**
 * Reasoning
 * A description of the chain of thought used by a reasoning model while generating
 * a response. Be sure to include these items in your `input` to the Responses API
 * for subsequent turns of a conversation if you are manually
 * [managing context](/docs/guides/conversation-state).
 */
export interface ReasoningItem {
  /** The type of the object. Always `reasoning`. */
  type: "reasoning";
  /** The unique identifier of the reasoning content. */
  id: string;
  /**
   * The encrypted content of the reasoning item - populated when a response is
   * generated with `reasoning.encrypted_content` in the `include` parameter.
   */
  encrypted_content?: string | null;
  /** Reasoning text contents. */
  summary: {
    /** The type of the object. Always `summary_text`. */
    type: "summary_text";
    /**
     * A short summary of the reasoning used by the model when generating
     * the response.
     */
    text: string;
  }[];
  /**
   * The status of the item. One of `in_progress`, `completed`, or
   * `incomplete`. Populated when items are returned via API.
   */
  status?: "in_progress" | "completed" | "incomplete";
}

/**
 * The response object
 * @example {"id":"resp_67ccd3a9da748190baa7f1570fe91ac604becb25c45c1d41","object":"response","created_at":1741476777,"status":"completed","error":null,"incomplete_details":null,"instructions":null,"max_output_tokens":null,"model":"gpt-4o-2024-08-06","output":[{"type":"message","id":"msg_67ccd3acc8d48190a77525dc6de64b4104becb25c45c1d41","status":"completed","role":"assistant","content":[{"type":"output_text","text":"The image depicts a scenic landscape with a wooden boardwalk or pathway leading through lush, green grass under a blue sky with some clouds. The setting suggests a peaceful natural area, possibly a park or nature reserve. There are trees and shrubs in the background.","annotations":[]}]}],"parallel_tool_calls":true,"previous_response_id":null,"reasoning":{"effort":null,"summary":null},"store":true,"temperature":1,"text":{"format":{"type":"text"}},"tool_choice":"auto","tools":[],"top_p":1,"truncation":"disabled","usage":{"input_tokens":328,"input_tokens_details":{"cached_tokens":0},"output_tokens":52,"output_tokens_details":{"reasoning_tokens":0},"total_tokens":380},"user":null,"metadata":{}}
 */
export type Response = ModelResponseProperties &
  ResponseProperties & {
    /** Unique identifier for this Response. */
    id: string;
    /** The object type of this resource - always set to `response`. */
    object: "response";
    /**
     * The status of the response generation. One of `completed`, `failed`,
     * `in_progress`, `cancelled`, `queued`, or `incomplete`.
     */
    status?: "completed" | "failed" | "in_progress" | "cancelled" | "queued" | "incomplete";
    /** Unix timestamp (in seconds) of when this Response was created. */
    created_at: number;
    /** An error object returned when the model fails to generate a Response. */
    error: ResponseError;
    /** Details about why the response is incomplete. */
    incomplete_details: {
      /** The reason why the response is incomplete. */
      reason?: "max_output_tokens" | "content_filter";
    } | null;
    /**
     * An array of content items generated by the model.
     *
     * - The length and order of items in the `output` array is dependent
     *   on the model's response.
     * - Rather than accessing the first item in the `output` array and
     *   assuming it's an `assistant` message with the content generated by
     *   the model, you might consider using the `output_text` property where
     *   supported in SDKs.
     */
    output: OutputItem[];
    /**
     * A system (or developer) message inserted into the model's context.
     *
     * When using along with `previous_response_id`, the instructions from a previous
     * response will not be carried over to the next response. This makes it simple
     * to swap out system (or developer) messages in new responses.
     */
    instructions: string | InputItem[] | null;
    /**
     * SDK-only convenience property that contains the aggregated text output
     * from all `output_text` items in the `output` array, if any are present.
     * Supported in the Python and JavaScript SDKs.
     */
    output_text?: string | null;
    /**
     * Represents token usage details including input tokens, output tokens,
     * a breakdown of output tokens, and the total tokens used.
     */
    usage?: ResponseUsage;
    /**
     * Whether to allow the model to run tool calls in parallel.
     * @default true
     */
    parallel_tool_calls: boolean;
  };

/** Emitted when there is a partial audio response. */
export interface ResponseAudioDeltaEvent {
  /** The type of the event. Always `response.audio.delta`. */
  type: "response.audio.delta";
  /** A sequence number for this chunk of the stream response. */
  sequence_number: number;
  /** A chunk of Base64 encoded response audio bytes. */
  delta: string;
}

/** Emitted when the audio response is complete. */
export interface ResponseAudioDoneEvent {
  /** The type of the event. Always `response.audio.done`. */
  type: "response.audio.done";
  /** The sequence number of the delta. */
  sequence_number: number;
}

/** Emitted when there is a partial transcript of audio. */
export interface ResponseAudioTranscriptDeltaEvent {
  /** The type of the event. Always `response.audio.transcript.delta`. */
  type: "response.audio.transcript.delta";
  /** The partial transcript of the audio response. */
  delta: string;
  /** The sequence number of this event. */
  sequence_number: number;
}

/** Emitted when the full audio transcript is completed. */
export interface ResponseAudioTranscriptDoneEvent {
  /** The type of the event. Always `response.audio.transcript.done`. */
  type: "response.audio.transcript.done";
  /** The sequence number of this event. */
  sequence_number: number;
}

/** Emitted when a partial code snippet is streamed by the code interpreter. */
export interface ResponseCodeInterpreterCallCodeDeltaEvent {
  /** The type of the event. Always `response.code_interpreter_call_code.delta`. */
  type: "response.code_interpreter_call_code.delta";
  /** The index of the output item in the response for which the code is being streamed. */
  output_index: number;
  /** The unique identifier of the code interpreter tool call item. */
  item_id: string;
  /** The partial code snippet being streamed by the code interpreter. */
  delta: string;
  /** The sequence number of this event, used to order streaming events. */
  sequence_number: number;
}

/** Emitted when the code snippet is finalized by the code interpreter. */
export interface ResponseCodeInterpreterCallCodeDoneEvent {
  /** The type of the event. Always `response.code_interpreter_call_code.done`. */
  type: "response.code_interpreter_call_code.done";
  /** The index of the output item in the response for which the code is finalized. */
  output_index: number;
  /** The unique identifier of the code interpreter tool call item. */
  item_id: string;
  /** The final code snippet output by the code interpreter. */
  code: string;
  /** The sequence number of this event, used to order streaming events. */
  sequence_number: number;
}

/** Emitted when the code interpreter call is completed. */
export interface ResponseCodeInterpreterCallCompletedEvent {
  /** The type of the event. Always `response.code_interpreter_call.completed`. */
  type: "response.code_interpreter_call.completed";
  /** The index of the output item in the response for which the code interpreter call is completed. */
  output_index: number;
  /** The unique identifier of the code interpreter tool call item. */
  item_id: string;
  /** The sequence number of this event, used to order streaming events. */
  sequence_number: number;
}

/** Emitted when a code interpreter call is in progress. */
export interface ResponseCodeInterpreterCallInProgressEvent {
  /** The type of the event. Always `response.code_interpreter_call.in_progress`. */
  type: "response.code_interpreter_call.in_progress";
  /** The index of the output item in the response for which the code interpreter call is in progress. */
  output_index: number;
  /** The unique identifier of the code interpreter tool call item. */
  item_id: string;
  /** The sequence number of this event, used to order streaming events. */
  sequence_number: number;
}

/** Emitted when the code interpreter is actively interpreting the code snippet. */
export interface ResponseCodeInterpreterCallInterpretingEvent {
  /** The type of the event. Always `response.code_interpreter_call.interpreting`. */
  type: "response.code_interpreter_call.interpreting";
  /** The index of the output item in the response for which the code interpreter is interpreting code. */
  output_index: number;
  /** The unique identifier of the code interpreter tool call item. */
  item_id: string;
  /** The sequence number of this event, used to order streaming events. */
  sequence_number: number;
}

/** Emitted when the model response is complete. */
export interface ResponseCompletedEvent {
  /** The type of the event. Always `response.completed`. */
  type: "response.completed";
  /** Properties of the completed response. */
  response: Response;
  /** The sequence number for this event. */
  sequence_number: number;
}

/** Emitted when a new content part is added. */
export interface ResponseContentPartAddedEvent {
  /** The type of the event. Always `response.content_part.added`. */
  type: "response.content_part.added";
  /** The ID of the output item that the content part was added to. */
  item_id: string;
  /** The index of the output item that the content part was added to. */
  output_index: number;
  /** The index of the content part that was added. */
  content_index: number;
  /** The content part that was added. */
  part: OutputContent;
  /** The sequence number of this event. */
  sequence_number: number;
}

/** Emitted when a content part is done. */
export interface ResponseContentPartDoneEvent {
  /** The type of the event. Always `response.content_part.done`. */
  type: "response.content_part.done";
  /** The ID of the output item that the content part was added to. */
  item_id: string;
  /** The index of the output item that the content part was added to. */
  output_index: number;
  /** The index of the content part that is done. */
  content_index: number;
  /** The sequence number of this event. */
  sequence_number: number;
  /** The content part that is done. */
  part: OutputContent;
}

/** An event that is emitted when a response is created. */
export interface ResponseCreatedEvent {
  /** The type of the event. Always `response.created`. */
  type: "response.created";
  /** The response that was created. */
  response: Response;
  /** The sequence number for this event. */
  sequence_number: number;
}

/** An error object returned when the model fails to generate a Response. */
export type ResponseError = {
  /** The error code for the response. */
  code: ResponseErrorCode;
  /** A human-readable description of the error. */
  message: string;
} | null;

/** The error code for the response. */
export type ResponseErrorCode =
  | "server_error"
  | "rate_limit_exceeded"
  | "invalid_prompt"
  | "vector_store_timeout"
  | "invalid_image"
  | "invalid_image_format"
  | "invalid_base64_image"
  | "invalid_image_url"
  | "image_too_large"
  | "image_too_small"
  | "image_parse_error"
  | "image_content_policy_violation"
  | "invalid_image_mode"
  | "image_file_too_large"
  | "unsupported_image_media_type"
  | "empty_image_file"
  | "failed_to_download_image"
  | "image_file_not_found";

/** Emitted when an error occurs. */
export interface ResponseErrorEvent {
  /** The type of the event. Always `error`. */
  type: "error";
  /** The error code. */
  code: string | null;
  /** The error message. */
  message: string;
  /** The error parameter. */
  param: string | null;
  /** The sequence number of this event. */
  sequence_number: number;
}

/** An event that is emitted when a response fails. */
export interface ResponseFailedEvent {
  /** The type of the event. Always `response.failed`. */
  type: "response.failed";
  /** The sequence number of this event. */
  sequence_number: number;
  /** The response that failed. */
  response: Response;
}

/** Emitted when a file search call is completed (results found). */
export interface ResponseFileSearchCallCompletedEvent {
  /** The type of the event. Always `response.file_search_call.completed`. */
  type: "response.file_search_call.completed";
  /** The index of the output item that the file search call is initiated. */
  output_index: number;
  /** The ID of the output item that the file search call is initiated. */
  item_id: string;
  /** The sequence number of this event. */
  sequence_number: number;
}

/** Emitted when a file search call is initiated. */
export interface ResponseFileSearchCallInProgressEvent {
  /** The type of the event. Always `response.file_search_call.in_progress`. */
  type: "response.file_search_call.in_progress";
  /** The index of the output item that the file search call is initiated. */
  output_index: number;
  /** The ID of the output item that the file search call is initiated. */
  item_id: string;
  /** The sequence number of this event. */
  sequence_number: number;
}

/** Emitted when a file search is currently searching. */
export interface ResponseFileSearchCallSearchingEvent {
  /** The type of the event. Always `response.file_search_call.searching`. */
  type: "response.file_search_call.searching";
  /** The index of the output item that the file search call is searching. */
  output_index: number;
  /** The ID of the output item that the file search call is initiated. */
  item_id: string;
  /** The sequence number of this event. */
  sequence_number: number;
}

/**
 * JSON object
 * JSON object response format. An older method of generating JSON responses.
 * Using `json_schema` is recommended for models that support it. Note that the
 * model will not generate JSON without a system or user message instructing it
 * to do so.
 */
export interface ResponseFormatJsonObject {
  /** The type of response format being defined. Always `json_object`. */
  type: "json_object";
}

/**
 * JSON schema
 * JSON Schema response format. Used to generate structured JSON responses.
 * Learn more about [Structured Outputs](/docs/guides/structured-outputs).
 */
export interface ResponseFormatJsonSchema {
  /** The type of response format being defined. Always `json_schema`. */
  type: "json_schema";
  /**
   * JSON schema
   * Structured Outputs configuration options, including a JSON Schema.
   */
  json_schema: {
    /**
     * A description of what the response format is for, used by the model to
     * determine how to respond in the format.
     */
    description?: string;
    /**
     * The name of the response format. Must be a-z, A-Z, 0-9, or contain
     * underscores and dashes, with a maximum length of 64.
     */
    name: string;
    /**
     * The schema for the response format, described as a JSON Schema object.
     * Learn how to build JSON schemas [here](https://json-schema.org/).
     */
    schema?: ResponseFormatJsonSchemaSchema;
    /**
     * Whether to enable strict schema adherence when generating the output.
     * If set to true, the model will always follow the exact schema defined
     * in the `schema` field. Only a subset of JSON Schema is supported when
     * `strict` is `true`. To learn more, read the [Structured Outputs
     * guide](/docs/guides/structured-outputs).
     * @default false
     */
    strict?: boolean | null;
  };
}

/**
 * JSON schema
 * The schema for the response format, described as a JSON Schema object.
 * Learn how to build JSON schemas [here](https://json-schema.org/).
 */
export type ResponseFormatJsonSchemaSchema = Record<string, any>;

/**
 * Text
 * Default response format. Used to generate text responses.
 */
export interface ResponseFormatText {
  /** The type of response format being defined. Always `text`. */
  type: "text";
}

/** Emitted when there is a partial function-call arguments delta. */
export interface ResponseFunctionCallArgumentsDeltaEvent {
  /** The type of the event. Always `response.function_call_arguments.delta`. */
  type: "response.function_call_arguments.delta";
  /** The ID of the output item that the function-call arguments delta is added to. */
  item_id: string;
  /** The index of the output item that the function-call arguments delta is added to. */
  output_index: number;
  /** The sequence number of this event. */
  sequence_number: number;
  /** The function-call arguments delta that is added. */
  delta: string;
}

/** Emitted when function-call arguments are finalized. */
export interface ResponseFunctionCallArgumentsDoneEvent {
  type: "response.function_call_arguments.done";
  /** The ID of the item. */
  item_id: string;
  /** The index of the output item. */
  output_index: number;
  /** The sequence number of this event. */
  sequence_number: number;
  /** The function-call arguments. */
  arguments: string;
}

/**
 * ResponseImageGenCallCompletedEvent
 * Emitted when an image generation tool call has completed and the final image is available.
 */
export interface ResponseImageGenCallCompletedEvent {
  /** The type of the event. Always 'response.image_generation_call.completed'. */
  type: "response.image_generation_call.completed";
  /** The index of the output item in the response's output array. */
  output_index: number;
  /** The sequence number of this event. */
  sequence_number: number;
  /** The unique identifier of the image generation item being processed. */
  item_id: string;
}

/**
 * ResponseImageGenCallGeneratingEvent
 * Emitted when an image generation tool call is actively generating an image (intermediate state).
 */
export interface ResponseImageGenCallGeneratingEvent {
  /** The type of the event. Always 'response.image_generation_call.generating'. */
  type: "response.image_generation_call.generating";
  /** The index of the output item in the response's output array. */
  output_index: number;
  /** The unique identifier of the image generation item being processed. */
  item_id: string;
  /** The sequence number of the image generation item being processed. */
  sequence_number: number;
}

/**
 * ResponseImageGenCallInProgressEvent
 * Emitted when an image generation tool call is in progress.
 */
export interface ResponseImageGenCallInProgressEvent {
  /** The type of the event. Always 'response.image_generation_call.in_progress'. */
  type: "response.image_generation_call.in_progress";
  /** The index of the output item in the response's output array. */
  output_index: number;
  /** The unique identifier of the image generation item being processed. */
  item_id: string;
  /** The sequence number of the image generation item being processed. */
  sequence_number: number;
}

/**
 * ResponseImageGenCallPartialImageEvent
 * Emitted when a partial image is available during image generation streaming.
 */
export interface ResponseImageGenCallPartialImageEvent {
  /** The type of the event. Always 'response.image_generation_call.partial_image'. */
  type: "response.image_generation_call.partial_image";
  /** The index of the output item in the response's output array. */
  output_index: number;
  /** The unique identifier of the image generation item being processed. */
  item_id: string;
  /** The sequence number of the image generation item being processed. */
  sequence_number: number;
  /** 0-based index for the partial image (backend is 1-based, but this is 0-based for the user). */
  partial_image_index: number;
  /** Base64-encoded partial image data, suitable for rendering as an image. */
  partial_image_b64: string;
}

/** Emitted when the response is in progress. */
export interface ResponseInProgressEvent {
  /** The type of the event. Always `response.in_progress`. */
  type: "response.in_progress";
  /** The response that is in progress. */
  response: Response;
  /** The sequence number of this event. */
  sequence_number: number;
}

/** An event that is emitted when a response finishes as incomplete. */
export interface ResponseIncompleteEvent {
  /** The type of the event. Always `response.incomplete`. */
  type: "response.incomplete";
  /** The response that was incomplete. */
  response: Response;
  /** The sequence number of this event. */
  sequence_number: number;
}

/** A list of Response items. */
export interface ResponseItemList {
  /** The type of object returned, must be `list`. */
  object: "list";
  /** A list of items used to generate this response. */
  data: ItemResource[];
  /** Whether there are more items available. */
  has_more: boolean;
  /** The ID of the first item in the list. */
  first_id: string;
  /** The ID of the last item in the list. */
  last_id: string;
}

/**
 * ResponseMCPCallArgumentsDeltaEvent
 * Emitted when there is a delta (partial update) to the arguments of an MCP tool call.
 */
export interface ResponseMCPCallArgumentsDeltaEvent {
  /** The type of the event. Always 'response.mcp_call_arguments.delta'. */
  type: "response.mcp_call_arguments.delta";
  /** The index of the output item in the response's output array. */
  output_index: number;
  /** The unique identifier of the MCP tool call item being processed. */
  item_id: string;
  /** The partial update to the arguments for the MCP tool call. */
  delta: object;
  /** The sequence number of this event. */
  sequence_number: number;
}

/**
 * ResponseMCPCallArgumentsDoneEvent
 * Emitted when the arguments for an MCP tool call are finalized.
 */
export interface ResponseMCPCallArgumentsDoneEvent {
  /** The type of the event. Always 'response.mcp_call_arguments.done'. */
  type: "response.mcp_call_arguments.done";
  /** The index of the output item in the response's output array. */
  output_index: number;
  /** The unique identifier of the MCP tool call item being processed. */
  item_id: string;
  /** The finalized arguments for the MCP tool call. */
  arguments: object;
  /** The sequence number of this event. */
  sequence_number: number;
}

/**
 * ResponseMCPCallCompletedEvent
 * Emitted when an MCP  tool call has completed successfully.
 */
export interface ResponseMCPCallCompletedEvent {
  /** The type of the event. Always 'response.mcp_call.completed'. */
  type: "response.mcp_call.completed";
  /** The sequence number of this event. */
  sequence_number: number;
}

/**
 * ResponseMCPCallFailedEvent
 * Emitted when an MCP  tool call has failed.
 */
export interface ResponseMCPCallFailedEvent {
  /** The type of the event. Always 'response.mcp_call.failed'. */
  type: "response.mcp_call.failed";
  /** The sequence number of this event. */
  sequence_number: number;
}

/**
 * ResponseMCPCallInProgressEvent
 * Emitted when an MCP  tool call is in progress.
 */
export interface ResponseMCPCallInProgressEvent {
  /** The type of the event. Always 'response.mcp_call.in_progress'. */
  type: "response.mcp_call.in_progress";
  /** The sequence number of this event. */
  sequence_number: number;
  /** The index of the output item in the response's output array. */
  output_index: number;
  /** The unique identifier of the MCP tool call item being processed. */
  item_id: string;
}

/**
 * ResponseMCPListToolsCompletedEvent
 * Emitted when the list of available MCP tools has been successfully retrieved.
 */
export interface ResponseMCPListToolsCompletedEvent {
  /** The type of the event. Always 'response.mcp_list_tools.completed'. */
  type: "response.mcp_list_tools.completed";
  /** The sequence number of this event. */
  sequence_number: number;
}

/**
 * ResponseMCPListToolsFailedEvent
 * Emitted when the attempt to list available MCP tools has failed.
 */
export interface ResponseMCPListToolsFailedEvent {
  /** The type of the event. Always 'response.mcp_list_tools.failed'. */
  type: "response.mcp_list_tools.failed";
  /** The sequence number of this event. */
  sequence_number: number;
}

/**
 * ResponseMCPListToolsInProgressEvent
 * Emitted when the system is in the process of retrieving the list of available MCP tools.
 */
export interface ResponseMCPListToolsInProgressEvent {
  /** The type of the event. Always 'response.mcp_list_tools.in_progress'. */
  type: "response.mcp_list_tools.in_progress";
  /** The sequence number of this event. */
  sequence_number: number;
}

/**
 * Output types that you would like the model to generate.
 * Most models are capable of generating text, which is the default:
 *
 * `["text"]`
 *
 * The `gpt-4o-audio-preview` model can also be used to
 * [generate audio](/docs/guides/audio). To request that this model generate
 * both text and audio responses, you can use:
 *
 * `["text", "audio"]`
 */
export type ResponseModalities = ("text" | "audio")[] | null;

/** Emitted when a new output item is added. */
export interface ResponseOutputItemAddedEvent {
  /** The type of the event. Always `response.output_item.added`. */
  type: "response.output_item.added";
  /** The index of the output item that was added. */
  output_index: number;
  /** The sequence number of this event. */
  sequence_number: number;
  /** The output item that was added. */
  item: OutputItem;
}

/** Emitted when an output item is marked done. */
export interface ResponseOutputItemDoneEvent {
  /** The type of the event. Always `response.output_item.done`. */
  type: "response.output_item.done";
  /** The index of the output item that was marked done. */
  output_index: number;
  /** The sequence number of this event. */
  sequence_number: number;
  /** The output item that was marked done. */
  item: OutputItem;
}

/**
 * ResponseOutputTextAnnotationAddedEvent
 * Emitted when an annotation is added to output text content.
 */
export interface ResponseOutputTextAnnotationAddedEvent {
  /** The type of the event. Always 'response.output_text.annotation.added'. */
  type: "response.output_text.annotation.added";
  /** The unique identifier of the item to which the annotation is being added. */
  item_id: string;
  /** The index of the output item in the response's output array. */
  output_index: number;
  /** The index of the content part within the output item. */
  content_index: number;
  /** The index of the annotation within the content part. */
  annotation_index: number;
  /** The sequence number of this event. */
  sequence_number: number;
  /** The annotation object being added. (See annotation schema for details.) */
  annotation: object;
}

/**
 * Prompt Variables
 * Optional map of values to substitute in for variables in your
 * prompt. The substitution values can either be strings, or other
 * Response input types like images or files.
 */
export type ResponsePromptVariables = Record<string, string | InputTextContent | InputImageContent | InputFileContent>;

export interface ResponseProperties {
  /**
   * The unique ID of the previous response to the model. Use this to
   * create multi-turn conversations. Learn more about
   * [conversation state](/docs/guides/conversation-state).
   */
  previous_response_id?: string | null;
  /**
   * Model ID used to generate the response, like `gpt-4o` or `o3`. OpenAI
   * offers a wide range of models with different capabilities, performance
   * characteristics, and price points. Refer to the [model guide](/docs/models)
   * to browse and compare available models.
   */
  model?: ModelIdsResponses;
  /**
   * **o-series models only**
   *
   * Configuration options for
   * [reasoning models](https://platform.openai.com/docs/guides/reasoning).
   */
  reasoning?: Reasoning | null;
  /**
   * Whether to run the model response in the background.
   * [Learn more](/docs/guides/background).
   * @default false
   */
  background?: boolean | null;
  /** An upper bound for the number of tokens that can be generated for a response, including visible output tokens and [reasoning tokens](/docs/guides/reasoning). */
  max_output_tokens?: number | null;
  /** The maximum number of total calls to built-in tools that can be processed in a response. This maximum number applies across all built-in tool calls, not per individual tool. Any further attempts to call a tool by the model will be ignored. */
  max_tool_calls?: number | null;
  /**
   * Configuration options for a text response from the model. Can be plain
   * text or structured JSON data. Learn more:
   * - [Text inputs and outputs](/docs/guides/text)
   * - [Structured Outputs](/docs/guides/structured-outputs)
   */
  text?: {
    /**
     * An object specifying the format that the model must output.
     *
     * Configuring `{ "type": "json_schema" }` enables Structured Outputs,
     * which ensures the model will match your supplied JSON schema. Learn more in the
     * [Structured Outputs guide](/docs/guides/structured-outputs).
     *
     * The default format is `{ "type": "text" }` with no additional options.
     *
     * **Not recommended for gpt-4o and newer models:**
     *
     * Setting to `{ "type": "json_object" }` enables the older JSON mode, which
     * ensures the message the model generates is valid JSON. Using `json_schema`
     * is preferred for models that support it.
     */
    format?: TextResponseFormatConfiguration;
  };
  /**
   * An array of tools the model may call while generating a response. You
   * can specify which tool to use by setting the `tool_choice` parameter.
   *
   * The two categories of tools you can provide the model are:
   *
   * - **Built-in tools**: Tools that are provided by OpenAI that extend the
   *   model's capabilities, like [web search](/docs/guides/tools-web-search)
   *   or [file search](/docs/guides/tools-file-search). Learn more about
   *   [built-in tools](/docs/guides/tools).
   * - **Function calls (custom tools)**: Functions that are defined by you,
   *   enabling the model to call your own code. Learn more about
   *   [function calling](/docs/guides/function-calling).
   */
  tools?: Tool[];
  /**
   * How the model should select which tool (or tools) to use when generating
   * a response. See the `tools` parameter to see how to specify which tools
   * the model can call.
   */
  tool_choice?: ToolChoiceOptions | ToolChoiceTypes | ToolChoiceFunction | ToolChoiceMCP;
  /**
   * Reference to a prompt template and its variables.
   * [Learn more](/docs/guides/text?api-mode=responses#reusable-prompts).
   */
  prompt?: Prompt;
  /**
   * The truncation strategy to use for the model response.
   * - `auto`: If the context of this response and previous ones exceeds
   *   the model's context window size, the model will truncate the
   *   response to fit the context window by dropping input items in the
   *   middle of the conversation.
   * - `disabled` (default): If a model response will exceed the context window
   *   size for a model, the request will fail with a 400 error.
   * @default "disabled"
   */
  truncation?: "auto" | "disabled" | null;
}

/**
 * ResponseQueuedEvent
 * Emitted when a response is queued and waiting to be processed.
 */
export interface ResponseQueuedEvent {
  /** The type of the event. Always 'response.queued'. */
  type: "response.queued";
  /** The full response object that is queued. */
  response: Response;
  /** The sequence number for this event. */
  sequence_number: number;
}

/**
 * ResponseReasoningDeltaEvent
 * Emitted when there is a delta (partial update) to the reasoning content.
 */
export interface ResponseReasoningDeltaEvent {
  /** The type of the event. Always 'response.reasoning.delta'. */
  type: "response.reasoning.delta";
  /** The unique identifier of the item for which reasoning is being updated. */
  item_id: string;
  /** The index of the output item in the response's output array. */
  output_index: number;
  /** The index of the reasoning content part within the output item. */
  content_index: number;
  /** The partial update to the reasoning content. */
  delta: object;
  /** The sequence number of this event. */
  sequence_number: number;
}

/**
 * ResponseReasoningDoneEvent
 * Emitted when the reasoning content is finalized for an item.
 */
export interface ResponseReasoningDoneEvent {
  /** The type of the event. Always 'response.reasoning.done'. */
  type: "response.reasoning.done";
  /** The unique identifier of the item for which reasoning is finalized. */
  item_id: string;
  /** The index of the output item in the response's output array. */
  output_index: number;
  /** The index of the reasoning content part within the output item. */
  content_index: number;
  /** The finalized reasoning text. */
  text: string;
  /** The sequence number of this event. */
  sequence_number: number;
}

/**
 * ResponseReasoningSummaryDeltaEvent
 * Emitted when there is a delta (partial update) to the reasoning summary content.
 */
export interface ResponseReasoningSummaryDeltaEvent {
  /** The type of the event. Always 'response.reasoning_summary.delta'. */
  type: "response.reasoning_summary.delta";
  /** The unique identifier of the item for which the reasoning summary is being updated. */
  item_id: string;
  /** The index of the output item in the response's output array. */
  output_index: number;
  /** The index of the summary part within the output item. */
  summary_index: number;
  /** The sequence number of this event. */
  sequence_number: number;
  /** The partial update to the reasoning summary content. */
  delta: object;
}

/**
 * ResponseReasoningSummaryDoneEvent
 * Emitted when the reasoning summary content is finalized for an item.
 */
export interface ResponseReasoningSummaryDoneEvent {
  /** The type of the event. Always 'response.reasoning_summary.done'. */
  type: "response.reasoning_summary.done";
  /** The unique identifier of the item for which the reasoning summary is finalized. */
  item_id: string;
  /** The index of the output item in the response's output array. */
  output_index: number;
  /** The index of the summary part within the output item. */
  summary_index: number;
  /** The finalized reasoning summary text. */
  text: string;
  /** The sequence number of this event. */
  sequence_number: number;
}

/** Emitted when a new reasoning summary part is added. */
export interface ResponseReasoningSummaryPartAddedEvent {
  /** The type of the event. Always `response.reasoning_summary_part.added`. */
  type: "response.reasoning_summary_part.added";
  /** The ID of the item this summary part is associated with. */
  item_id: string;
  /** The index of the output item this summary part is associated with. */
  output_index: number;
  /** The index of the summary part within the reasoning summary. */
  summary_index: number;
  /** The sequence number of this event. */
  sequence_number: number;
  /** The summary part that was added. */
  part: {
    /** The type of the summary part. Always `summary_text`. */
    type: "summary_text";
    /** The text of the summary part. */
    text: string;
  };
}

/** Emitted when a reasoning summary part is completed. */
export interface ResponseReasoningSummaryPartDoneEvent {
  /** The type of the event. Always `response.reasoning_summary_part.done`. */
  type: "response.reasoning_summary_part.done";
  /** The ID of the item this summary part is associated with. */
  item_id: string;
  /** The index of the output item this summary part is associated with. */
  output_index: number;
  /** The index of the summary part within the reasoning summary. */
  summary_index: number;
  /** The sequence number of this event. */
  sequence_number: number;
  /** The completed summary part. */
  part: {
    /** The type of the summary part. Always `summary_text`. */
    type: "summary_text";
    /** The text of the summary part. */
    text: string;
  };
}

/** Emitted when a delta is added to a reasoning summary text. */
export interface ResponseReasoningSummaryTextDeltaEvent {
  /** The type of the event. Always `response.reasoning_summary_text.delta`. */
  type: "response.reasoning_summary_text.delta";
  /** The ID of the item this summary text delta is associated with. */
  item_id: string;
  /** The index of the output item this summary text delta is associated with. */
  output_index: number;
  /** The index of the summary part within the reasoning summary. */
  summary_index: number;
  /** The text delta that was added to the summary. */
  delta: string;
  /** The sequence number of this event. */
  sequence_number: number;
}

/** Emitted when a reasoning summary text is completed. */
export interface ResponseReasoningSummaryTextDoneEvent {
  /** The type of the event. Always `response.reasoning_summary_text.done`. */
  type: "response.reasoning_summary_text.done";
  /** The ID of the item this summary text is associated with. */
  item_id: string;
  /** The index of the output item this summary text is associated with. */
  output_index: number;
  /** The index of the summary part within the reasoning summary. */
  summary_index: number;
  /** The full text of the completed reasoning summary. */
  text: string;
  /** The sequence number of this event. */
  sequence_number: number;
}

/** Emitted when there is a partial refusal text. */
export interface ResponseRefusalDeltaEvent {
  /** The type of the event. Always `response.refusal.delta`. */
  type: "response.refusal.delta";
  /** The ID of the output item that the refusal text is added to. */
  item_id: string;
  /** The index of the output item that the refusal text is added to. */
  output_index: number;
  /** The index of the content part that the refusal text is added to. */
  content_index: number;
  /** The refusal text that is added. */
  delta: string;
  /** The sequence number of this event. */
  sequence_number: number;
}

/** Emitted when refusal text is finalized. */
export interface ResponseRefusalDoneEvent {
  /** The type of the event. Always `response.refusal.done`. */
  type: "response.refusal.done";
  /** The ID of the output item that the refusal text is finalized. */
  item_id: string;
  /** The index of the output item that the refusal text is finalized. */
  output_index: number;
  /** The index of the content part that the refusal text is finalized. */
  content_index: number;
  /** The refusal text that is finalized. */
  refusal: string;
  /** The sequence number of this event. */
  sequence_number: number;
}

export type ResponseStreamEvent =
  | ResponseAudioDeltaEvent
  | ResponseAudioDoneEvent
  | ResponseAudioTranscriptDeltaEvent
  | ResponseAudioTranscriptDoneEvent
  | ResponseCodeInterpreterCallCodeDeltaEvent
  | ResponseCodeInterpreterCallCodeDoneEvent
  | ResponseCodeInterpreterCallCompletedEvent
  | ResponseCodeInterpreterCallInProgressEvent
  | ResponseCodeInterpreterCallInterpretingEvent
  | ResponseCompletedEvent
  | ResponseContentPartAddedEvent
  | ResponseContentPartDoneEvent
  | ResponseCreatedEvent
  | ResponseErrorEvent
  | ResponseFileSearchCallCompletedEvent
  | ResponseFileSearchCallInProgressEvent
  | ResponseFileSearchCallSearchingEvent
  | ResponseFunctionCallArgumentsDeltaEvent
  | ResponseFunctionCallArgumentsDoneEvent
  | ResponseInProgressEvent
  | ResponseFailedEvent
  | ResponseIncompleteEvent
  | ResponseOutputItemAddedEvent
  | ResponseOutputItemDoneEvent
  | ResponseReasoningSummaryPartAddedEvent
  | ResponseReasoningSummaryPartDoneEvent
  | ResponseReasoningSummaryTextDeltaEvent
  | ResponseReasoningSummaryTextDoneEvent
  | ResponseRefusalDeltaEvent
  | ResponseRefusalDoneEvent
  | ResponseTextDeltaEvent
  | ResponseTextDoneEvent
  | ResponseWebSearchCallCompletedEvent
  | ResponseWebSearchCallInProgressEvent
  | ResponseWebSearchCallSearchingEvent
  | ResponseImageGenCallCompletedEvent
  | ResponseImageGenCallGeneratingEvent
  | ResponseImageGenCallInProgressEvent
  | ResponseImageGenCallPartialImageEvent
  | ResponseMCPCallArgumentsDeltaEvent
  | ResponseMCPCallArgumentsDoneEvent
  | ResponseMCPCallCompletedEvent
  | ResponseMCPCallFailedEvent
  | ResponseMCPCallInProgressEvent
  | ResponseMCPListToolsCompletedEvent
  | ResponseMCPListToolsFailedEvent
  | ResponseMCPListToolsInProgressEvent
  | ResponseOutputTextAnnotationAddedEvent
  | ResponseQueuedEvent
  | ResponseReasoningDeltaEvent
  | ResponseReasoningDoneEvent
  | ResponseReasoningSummaryDeltaEvent
  | ResponseReasoningSummaryDoneEvent;

/** Emitted when there is an additional text delta. */
export interface ResponseTextDeltaEvent {
  /** The type of the event. Always `response.output_text.delta`. */
  type: "response.output_text.delta";
  /** The ID of the output item that the text delta was added to. */
  item_id: string;
  /** The index of the output item that the text delta was added to. */
  output_index: number;
  /** The index of the content part that the text delta was added to. */
  content_index: number;
  /** The text delta that was added. */
  delta: string;
  /** The sequence number for this event. */
  sequence_number: number;
}

/** Emitted when text content is finalized. */
export interface ResponseTextDoneEvent {
  /** The type of the event. Always `response.output_text.done`. */
  type: "response.output_text.done";
  /** The ID of the output item that the text content is finalized. */
  item_id: string;
  /** The index of the output item that the text content is finalized. */
  output_index: number;
  /** The index of the content part that the text content is finalized. */
  content_index: number;
  /** The text content that is finalized. */
  text: string;
  /** The sequence number for this event. */
  sequence_number: number;
}

/**
 * Represents token usage details including input tokens, output tokens,
 * a breakdown of output tokens, and the total tokens used.
 */
export interface ResponseUsage {
  /** The number of input tokens. */
  input_tokens: number;
  /** A detailed breakdown of the input tokens. */
  input_tokens_details: {
    /**
     * The number of tokens that were retrieved from the cache.
     * [More on prompt caching](/docs/guides/prompt-caching).
     */
    cached_tokens: number;
  };
  /** The number of output tokens. */
  output_tokens: number;
  /** A detailed breakdown of the output tokens. */
  output_tokens_details: {
    /** The number of reasoning tokens. */
    reasoning_tokens: number;
  };
  /** The total number of tokens used. */
  total_tokens: number;
}

/** Emitted when a web search call is completed. */
export interface ResponseWebSearchCallCompletedEvent {
  /** The type of the event. Always `response.web_search_call.completed`. */
  type: "response.web_search_call.completed";
  /** The index of the output item that the web search call is associated with. */
  output_index: number;
  /** Unique ID for the output item associated with the web search call. */
  item_id: string;
  /** The sequence number of the web search call being processed. */
  sequence_number: number;
}

/** Emitted when a web search call is initiated. */
export interface ResponseWebSearchCallInProgressEvent {
  /** The type of the event. Always `response.web_search_call.in_progress`. */
  type: "response.web_search_call.in_progress";
  /** The index of the output item that the web search call is associated with. */
  output_index: number;
  /** Unique ID for the output item associated with the web search call. */
  item_id: string;
  /** The sequence number of the web search call being processed. */
  sequence_number: number;
}

/** Emitted when a web search call is executing. */
export interface ResponseWebSearchCallSearchingEvent {
  /** The type of the event. Always `response.web_search_call.searching`. */
  type: "response.web_search_call.searching";
  /** The index of the output item that the web search call is associated with. */
  output_index: number;
  /** Unique ID for the output item associated with the web search call. */
  item_id: string;
  /** The sequence number of the web search call being processed. */
  sequence_number: number;
}

/** Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.). */
export type RunCompletionUsage = {
  /** Number of completion tokens used over the course of the run. */
  completion_tokens: number;
  /** Number of prompt tokens used over the course of the run. */
  prompt_tokens: number;
  /** Total number of tokens used (prompt + completion). */
  total_tokens: number;
} | null;

/** RunGraderRequest */
export interface RunGraderRequest {
  /** The grader used for the fine-tuning job. */
  grader: GraderStringCheck | GraderTextSimilarity | GraderPython | GraderScoreModel | GraderMulti;
  /**
   * The dataset item provided to the grader. This will be used to populate
   * the `item` namespace. See [the guide](/docs/guides/graders) for more details.
   */
  item?: object;
  /**
   * The model sample to be evaluated. This value will be used to populate
   * the `sample` namespace. See [the guide](/docs/guides/graders) for more details.
   * The `output_json` variable will be populated if the model sample is a
   * valid JSON string.
   *
   */
  model_sample: string;
}

export interface RunGraderResponse {
  reward: number;
  metadata: {
    name: string;
    type: string;
    errors: {
      formula_parse_error: boolean;
      sample_parse_error: boolean;
      truncated_observation_error: boolean;
      unresponsive_reward_error: boolean;
      invalid_variable_error: boolean;
      other_error: boolean;
      python_grader_server_error: boolean;
      python_grader_server_error_type: string | null;
      python_grader_runtime_error: boolean;
      python_grader_runtime_error_details: string | null;
      model_grader_server_error: boolean;
      model_grader_refusal_error: boolean;
      model_grader_parse_error: boolean;
      model_grader_server_error_details: string | null;
    };
    execution_time: number;
    scores: Record<string, any>;
    token_usage: number | null;
    sampled_model_name: string | null;
  };
  sub_rewards: Record<string, any>;
  model_grader_token_usage_per_model: Record<string, any>;
}

/**
 * A run on a thread
 * Represents an execution run on a [thread](/docs/api-reference/threads).
 */
export interface RunObject {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `thread.run`. */
  object: "thread.run";
  /** The Unix timestamp (in seconds) for when the run was created. */
  created_at: number;
  /** The ID of the [thread](/docs/api-reference/threads) that was executed on as a part of this run. */
  thread_id: string;
  /** The ID of the [assistant](/docs/api-reference/assistants) used for execution of this run. */
  assistant_id: string;
  /** The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`. */
  status:
    | "queued"
    | "in_progress"
    | "requires_action"
    | "cancelling"
    | "cancelled"
    | "failed"
    | "completed"
    | "incomplete"
    | "expired";
  /** Details on the action required to continue the run. Will be `null` if no action is required. */
  required_action: {
    /** For now, this is always `submit_tool_outputs`. */
    type: "submit_tool_outputs";
    /** Details on the tool outputs needed for this run to continue. */
    submit_tool_outputs: {
      /** A list of the relevant tool calls. */
      tool_calls: RunToolCallObject[];
    };
  } | null;
  /** The last error associated with this run. Will be `null` if there are no errors. */
  last_error: {
    /** One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`. */
    code: "server_error" | "rate_limit_exceeded" | "invalid_prompt";
    /** A human-readable description of the error. */
    message: string;
  } | null;
  /** The Unix timestamp (in seconds) for when the run will expire. */
  expires_at: number | null;
  /** The Unix timestamp (in seconds) for when the run was started. */
  started_at: number | null;
  /** The Unix timestamp (in seconds) for when the run was cancelled. */
  cancelled_at: number | null;
  /** The Unix timestamp (in seconds) for when the run failed. */
  failed_at: number | null;
  /** The Unix timestamp (in seconds) for when the run was completed. */
  completed_at: number | null;
  /** Details on why the run is incomplete. Will be `null` if the run is not incomplete. */
  incomplete_details: {
    /** The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run. */
    reason?: "max_completion_tokens" | "max_prompt_tokens";
  } | null;
  /** The model that the [assistant](/docs/api-reference/assistants) used for this run. */
  model: string;
  /** The instructions that the [assistant](/docs/api-reference/assistants) used for this run. */
  instructions: string;
  /**
   * The list of tools that the [assistant](/docs/api-reference/assistants) used for this run.
   * @maxItems 20
   * @default []
   */
  tools: (AssistantToolsCode | AssistantToolsFileSearch | AssistantToolsFunction)[];
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Metadata;
  /** Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.). */
  usage: RunCompletionUsage;
  /** The sampling temperature used for this run. If not set, defaults to 1. */
  temperature?: number | null;
  /** The nucleus sampling value used for this run. If not set, defaults to 1. */
  top_p?: number | null;
  /**
   * The maximum number of prompt tokens specified to have been used over the course of the run.
   * @min 256
   */
  max_prompt_tokens: number | null;
  /**
   * The maximum number of completion tokens specified to have been used over the course of the run.
   * @min 256
   */
  max_completion_tokens: number | null;
  truncation_strategy: TruncationObject;
  tool_choice: AssistantsApiToolChoiceOption;
  /** Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use. */
  parallel_tool_calls: ParallelToolCalls;
  /**
   * Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.
   *
   * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).
   *
   * Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.
   *
   * **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.
   */
  response_format: AssistantsApiResponseFormatOption | null;
}

/** Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`. */
export type RunStepCompletionUsage = {
  /** Number of completion tokens used over the course of the run step. */
  completion_tokens: number;
  /** Number of prompt tokens used over the course of the run step. */
  prompt_tokens: number;
  /** Total number of tokens used (prompt + completion). */
  total_tokens: number;
} | null;

/**
 * Run step delta object
 * Represents a run step delta i.e. any changed fields on a run step during streaming.
 */
export interface RunStepDeltaObject {
  /** The identifier of the run step, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `thread.run.step.delta`. */
  object: "thread.run.step.delta";
  /** The delta containing the fields that have changed on the run step. */
  delta: {
    /** The details of the run step. */
    step_details?: RunStepDeltaStepDetailsMessageCreationObject | RunStepDeltaStepDetailsToolCallsObject;
  };
}

/**
 * Message creation
 * Details of the message creation by the run step.
 */
export interface RunStepDeltaStepDetailsMessageCreationObject {
  /** Always `message_creation`. */
  type: "message_creation";
  message_creation?: {
    /** The ID of the message that was created by this run step. */
    message_id?: string;
  };
}

/**
 * Code interpreter tool call
 * Details of the Code Interpreter tool call the run step was involved in.
 */
export interface RunStepDeltaStepDetailsToolCallsCodeObject {
  /** The index of the tool call in the tool calls array. */
  index: number;
  /** The ID of the tool call. */
  id?: string;
  /** The type of tool call. This is always going to be `code_interpreter` for this type of tool call. */
  type: "code_interpreter";
  /** The Code Interpreter tool call definition. */
  code_interpreter?: {
    /** The input to the Code Interpreter tool call. */
    input?: string;
    /** The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type. */
    outputs?: (
      | RunStepDeltaStepDetailsToolCallsCodeOutputLogsObject
      | RunStepDeltaStepDetailsToolCallsCodeOutputImageObject
    )[];
  };
}

/** Code interpreter image output */
export interface RunStepDeltaStepDetailsToolCallsCodeOutputImageObject {
  /** The index of the output in the outputs array. */
  index: number;
  /** Always `image`. */
  type: "image";
  image?: {
    /** The [file](/docs/api-reference/files) ID of the image. */
    file_id?: string;
  };
}

/**
 * Code interpreter log output
 * Text output from the Code Interpreter tool call as part of a run step.
 */
export interface RunStepDeltaStepDetailsToolCallsCodeOutputLogsObject {
  /** The index of the output in the outputs array. */
  index: number;
  /** Always `logs`. */
  type: "logs";
  /** The text output from the Code Interpreter tool call. */
  logs?: string;
}

/** File search tool call */
export interface RunStepDeltaStepDetailsToolCallsFileSearchObject {
  /** The index of the tool call in the tool calls array. */
  index: number;
  /** The ID of the tool call object. */
  id?: string;
  /** The type of tool call. This is always going to be `file_search` for this type of tool call. */
  type: "file_search";
  /** For now, this is always going to be an empty object. */
  file_search: object;
}

/** Function tool call */
export interface RunStepDeltaStepDetailsToolCallsFunctionObject {
  /** The index of the tool call in the tool calls array. */
  index: number;
  /** The ID of the tool call object. */
  id?: string;
  /** The type of tool call. This is always going to be `function` for this type of tool call. */
  type: "function";
  /** The definition of the function that was called. */
  function?: {
    /** The name of the function. */
    name?: string;
    /** The arguments passed to the function. */
    arguments?: string;
    /** The output of the function. This will be `null` if the outputs have not been [submitted](/docs/api-reference/runs/submitToolOutputs) yet. */
    output?: string | null;
  };
}

/**
 * Tool calls
 * Details of the tool call.
 */
export interface RunStepDeltaStepDetailsToolCallsObject {
  /** Always `tool_calls`. */
  type: "tool_calls";
  /** An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`. */
  tool_calls?: (
    | RunStepDeltaStepDetailsToolCallsCodeObject
    | RunStepDeltaStepDetailsToolCallsFileSearchObject
    | RunStepDeltaStepDetailsToolCallsFunctionObject
  )[];
}

/**
 * Message creation
 * Details of the message creation by the run step.
 */
export interface RunStepDetailsMessageCreationObject {
  /** Always `message_creation`. */
  type: "message_creation";
  message_creation: {
    /** The ID of the message that was created by this run step. */
    message_id: string;
  };
}

/**
 * Code Interpreter tool call
 * Details of the Code Interpreter tool call the run step was involved in.
 */
export interface RunStepDetailsToolCallsCodeObject {
  /** The ID of the tool call. */
  id: string;
  /** The type of tool call. This is always going to be `code_interpreter` for this type of tool call. */
  type: "code_interpreter";
  /** The Code Interpreter tool call definition. */
  code_interpreter: {
    /** The input to the Code Interpreter tool call. */
    input: string;
    /** The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type. */
    outputs: (RunStepDetailsToolCallsCodeOutputLogsObject | RunStepDetailsToolCallsCodeOutputImageObject)[];
  };
}

/** Code Interpreter image output */
export interface RunStepDetailsToolCallsCodeOutputImageObject {
  /** Always `image`. */
  type: "image";
  image: {
    /** The [file](/docs/api-reference/files) ID of the image. */
    file_id: string;
  };
}

/**
 * Code Interpreter log output
 * Text output from the Code Interpreter tool call as part of a run step.
 */
export interface RunStepDetailsToolCallsCodeOutputLogsObject {
  /** Always `logs`. */
  type: "logs";
  /** The text output from the Code Interpreter tool call. */
  logs: string;
}

/** File search tool call */
export interface RunStepDetailsToolCallsFileSearchObject {
  /** The ID of the tool call object. */
  id: string;
  /** The type of tool call. This is always going to be `file_search` for this type of tool call. */
  type: "file_search";
  /** For now, this is always going to be an empty object. */
  file_search: {
    /** The ranking options for the file search. */
    ranking_options?: RunStepDetailsToolCallsFileSearchRankingOptionsObject;
    /** The results of the file search. */
    results?: RunStepDetailsToolCallsFileSearchResultObject[];
  };
}

/**
 * File search tool call ranking options
 * The ranking options for the file search.
 */
export interface RunStepDetailsToolCallsFileSearchRankingOptionsObject {
  /** The ranker to use for the file search. If not specified will use the `auto` ranker. */
  ranker: FileSearchRanker;
  /**
   * The score threshold for the file search. All values must be a floating point number between 0 and 1.
   * @min 0
   * @max 1
   */
  score_threshold: number;
}

/**
 * File search tool call result
 * A result instance of the file search.
 */
export interface RunStepDetailsToolCallsFileSearchResultObject {
  /** The ID of the file that result was found in. */
  file_id: string;
  /** The name of the file that result was found in. */
  file_name: string;
  /**
   * The score of the result. All values must be a floating point number between 0 and 1.
   * @min 0
   * @max 1
   */
  score: number;
  /** The content of the result that was found. The content is only included if requested via the include query parameter. */
  content?: {
    /** The type of the content. */
    type?: "text";
    /** The text content of the file. */
    text?: string;
  }[];
}

/** Function tool call */
export interface RunStepDetailsToolCallsFunctionObject {
  /** The ID of the tool call object. */
  id: string;
  /** The type of tool call. This is always going to be `function` for this type of tool call. */
  type: "function";
  /** The definition of the function that was called. */
  function: {
    /** The name of the function. */
    name: string;
    /** The arguments passed to the function. */
    arguments: string;
    /** The output of the function. This will be `null` if the outputs have not been [submitted](/docs/api-reference/runs/submitToolOutputs) yet. */
    output: string | null;
  };
}

/**
 * Tool calls
 * Details of the tool call.
 */
export interface RunStepDetailsToolCallsObject {
  /** Always `tool_calls`. */
  type: "tool_calls";
  /** An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`. */
  tool_calls: (
    | RunStepDetailsToolCallsCodeObject
    | RunStepDetailsToolCallsFileSearchObject
    | RunStepDetailsToolCallsFunctionObject
  )[];
}

/**
 * Run steps
 * Represents a step in execution of a run.
 */
export interface RunStepObject {
  /** The identifier of the run step, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `thread.run.step`. */
  object: "thread.run.step";
  /** The Unix timestamp (in seconds) for when the run step was created. */
  created_at: number;
  /** The ID of the [assistant](/docs/api-reference/assistants) associated with the run step. */
  assistant_id: string;
  /** The ID of the [thread](/docs/api-reference/threads) that was run. */
  thread_id: string;
  /** The ID of the [run](/docs/api-reference/runs) that this run step is a part of. */
  run_id: string;
  /** The type of run step, which can be either `message_creation` or `tool_calls`. */
  type: "message_creation" | "tool_calls";
  /** The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`. */
  status: "in_progress" | "cancelled" | "failed" | "completed" | "expired";
  /** The details of the run step. */
  step_details: RunStepDetailsMessageCreationObject | RunStepDetailsToolCallsObject;
  /** The last error associated with this run step. Will be `null` if there are no errors. */
  last_error: {
    /** One of `server_error` or `rate_limit_exceeded`. */
    code: "server_error" | "rate_limit_exceeded";
    /** A human-readable description of the error. */
    message: string;
  } | null;
  /** The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired. */
  expired_at: number | null;
  /** The Unix timestamp (in seconds) for when the run step was cancelled. */
  cancelled_at: number | null;
  /** The Unix timestamp (in seconds) for when the run step failed. */
  failed_at: number | null;
  /** The Unix timestamp (in seconds) for when the run step completed. */
  completed_at: number | null;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Metadata;
  /** Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`. */
  usage: RunStepCompletionUsage;
}

/** Occurs when a [run step](/docs/api-reference/run-steps/step-object) is created. */
export type RunStepStreamEvent =
  | {
      event: "thread.run.step.created";
      /** Represents a step in execution of a run. */
      data: RunStepObject;
    }
  | {
      event: "thread.run.step.in_progress";
      /** Represents a step in execution of a run. */
      data: RunStepObject;
    }
  | {
      event: "thread.run.step.delta";
      /** Represents a run step delta i.e. any changed fields on a run step during streaming. */
      data: RunStepDeltaObject;
    }
  | {
      event: "thread.run.step.completed";
      /** Represents a step in execution of a run. */
      data: RunStepObject;
    }
  | {
      event: "thread.run.step.failed";
      /** Represents a step in execution of a run. */
      data: RunStepObject;
    }
  | {
      event: "thread.run.step.cancelled";
      /** Represents a step in execution of a run. */
      data: RunStepObject;
    }
  | {
      event: "thread.run.step.expired";
      /** Represents a step in execution of a run. */
      data: RunStepObject;
    };

/** Occurs when a new [run](/docs/api-reference/runs/object) is created. */
export type RunStreamEvent =
  | {
      event: "thread.run.created";
      /** Represents an execution run on a [thread](/docs/api-reference/threads). */
      data: RunObject;
    }
  | {
      event: "thread.run.queued";
      /** Represents an execution run on a [thread](/docs/api-reference/threads). */
      data: RunObject;
    }
  | {
      event: "thread.run.in_progress";
      /** Represents an execution run on a [thread](/docs/api-reference/threads). */
      data: RunObject;
    }
  | {
      event: "thread.run.requires_action";
      /** Represents an execution run on a [thread](/docs/api-reference/threads). */
      data: RunObject;
    }
  | {
      event: "thread.run.completed";
      /** Represents an execution run on a [thread](/docs/api-reference/threads). */
      data: RunObject;
    }
  | {
      event: "thread.run.incomplete";
      /** Represents an execution run on a [thread](/docs/api-reference/threads). */
      data: RunObject;
    }
  | {
      event: "thread.run.failed";
      /** Represents an execution run on a [thread](/docs/api-reference/threads). */
      data: RunObject;
    }
  | {
      event: "thread.run.cancelling";
      /** Represents an execution run on a [thread](/docs/api-reference/threads). */
      data: RunObject;
    }
  | {
      event: "thread.run.cancelled";
      /** Represents an execution run on a [thread](/docs/api-reference/threads). */
      data: RunObject;
    }
  | {
      event: "thread.run.expired";
      /** Represents an execution run on a [thread](/docs/api-reference/threads). */
      data: RunObject;
    };

/** Tool call objects */
export interface RunToolCallObject {
  /** The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](/docs/api-reference/runs/submitToolOutputs) endpoint. */
  id: string;
  /** The type of tool call the output is required for. For now, this is always `function`. */
  type: "function";
  /** The function definition. */
  function: {
    /** The name of the function. */
    name: string;
    /** The arguments that the model expects you to pass to the function. */
    arguments: string;
  };
}

/**
 * Screenshot
 * A screenshot action.
 */
export interface Screenshot {
  /**
   * Specifies the event type. For a screenshot action, this property is
   * always set to `screenshot`.
   * @default "screenshot"
   */
  type: "screenshot";
}

/**
 * Scroll
 * A scroll action.
 */
export interface Scroll {
  /**
   * Specifies the event type. For a scroll action, this property is
   * always set to `scroll`.
   * @default "scroll"
   */
  type: "scroll";
  /** The x-coordinate where the scroll occurred. */
  x: number;
  /** The y-coordinate where the scroll occurred. */
  y: number;
  /** The horizontal scroll distance. */
  scroll_x: number;
  /** The vertical scroll distance. */
  scroll_y: number;
}

/**
 * Specifies the processing type used for serving the request.
 *   - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
 *   - If set to 'default', then the requset will be processed with the standard pricing and performance for the selected model.
 *   - If set to '[flex](/docs/guides/flex-processing)' or 'priority', then the request will be processed with the corresponding service tier. [Contact sales](https://openai.com/contact-sales) to learn more about Priority processing.
 *   - When not set, the default behavior is 'auto'.
 *
 *   When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.
 * @default "auto"
 */
export type ServiceTier = "auto" | "default" | "flex" | "scale" | "priority";

/** Emitted for each chunk of audio data generated during speech synthesis. */
export interface SpeechAudioDeltaEvent {
  /** The type of the event. Always `speech.audio.delta`. */
  type: "speech.audio.delta";
  /** A chunk of Base64-encoded audio data. */
  audio: string;
}

/** Emitted when the speech synthesis is complete and all audio has been streamed. */
export interface SpeechAudioDoneEvent {
  /** The type of the event. Always `speech.audio.done`. */
  type: "speech.audio.done";
  /** Token usage statistics for the request. */
  usage: {
    /** Number of input tokens in the prompt. */
    input_tokens: number;
    /** Number of output tokens generated. */
    output_tokens: number;
    /** Total number of tokens used (input + output). */
    total_tokens: number;
  };
}

export interface StaticChunkingStrategy {
  /**
   * The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.
   * @min 100
   * @max 4096
   */
  max_chunk_size_tokens: number;
  /**
   * The number of tokens that overlap between chunks. The default value is `400`.
   *
   * Note that the overlap must not exceed half of `max_chunk_size_tokens`.
   */
  chunk_overlap_tokens: number;
}

/**
 * Static Chunking Strategy
 * Customize your own chunking strategy by setting chunk size and chunk overlap.
 */
export interface StaticChunkingStrategyRequestParam {
  /** Always `static`. */
  type: "static";
  static: StaticChunkingStrategy;
}

/** Static Chunking Strategy */
export interface StaticChunkingStrategyResponseParam {
  /** Always `static`. */
  type: "static";
  static: StaticChunkingStrategy;
}

/**
 * Not supported with latest reasoning models `o3` and `o4-mini`.
 *
 * Up to 4 sequences where the API will stop generating further tokens. The
 * returned text will not contain the stop sequence.
 * @default null
 */
export type StopConfiguration = string | null | string[];

export interface SubmitToolOutputsRunRequest {
  /** A list of tools for which the outputs are being submitted. */
  tool_outputs: {
    /** The ID of the tool call in the `required_action` object within the run object the output is being submitted for. */
    tool_call_id?: string;
    /** The output of the tool call to be submitted to continue the run. */
    output?: string;
  }[];
  /** If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message. */
  stream?: boolean | null;
}

/**
 * An object specifying the format that the model must output.
 *
 * Configuring `{ "type": "json_schema" }` enables Structured Outputs,
 * which ensures the model will match your supplied JSON schema. Learn more in the
 * [Structured Outputs guide](/docs/guides/structured-outputs).
 *
 * The default format is `{ "type": "text" }` with no additional options.
 *
 * **Not recommended for gpt-4o and newer models:**
 *
 * Setting to `{ "type": "json_object" }` enables the older JSON mode, which
 * ensures the message the model generates is valid JSON. Using `json_schema`
 * is preferred for models that support it.
 */
export type TextResponseFormatConfiguration =
  | ResponseFormatText
  | TextResponseFormatJsonSchema
  | ResponseFormatJsonObject;

/**
 * JSON schema
 * JSON Schema response format. Used to generate structured JSON responses.
 * Learn more about [Structured Outputs](/docs/guides/structured-outputs).
 */
export interface TextResponseFormatJsonSchema {
  /** The type of response format being defined. Always `json_schema`. */
  type: "json_schema";
  /**
   * A description of what the response format is for, used by the model to
   * determine how to respond in the format.
   */
  description?: string;
  /**
   * The name of the response format. Must be a-z, A-Z, 0-9, or contain
   * underscores and dashes, with a maximum length of 64.
   */
  name: string;
  /**
   * The schema for the response format, described as a JSON Schema object.
   * Learn how to build JSON schemas [here](https://json-schema.org/).
   */
  schema: ResponseFormatJsonSchemaSchema;
  /**
   * Whether to enable strict schema adherence when generating the output.
   * If set to true, the model will always follow the exact schema defined
   * in the `schema` field. Only a subset of JSON Schema is supported when
   * `strict` is `true`. To learn more, read the [Structured Outputs
   * guide](/docs/guides/structured-outputs).
   * @default false
   */
  strict?: boolean | null;
}

/**
 * Thread
 * Represents a thread that contains [messages](/docs/api-reference/messages).
 */
export interface ThreadObject {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `thread`. */
  object: "thread";
  /** The Unix timestamp (in seconds) for when the thread was created. */
  created_at: number;
  /** A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs. */
  tool_resources: {
    code_interpreter?: {
      /**
       * A list of [file](/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.
       * @maxItems 20
       * @default []
       */
      file_ids?: string[];
    };
    file_search?: {
      /**
       * The [vector store](/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.
       * @maxItems 1
       */
      vector_store_ids?: string[];
    };
  } | null;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Metadata;
}

/** Occurs when a new [thread](/docs/api-reference/threads/object) is created. */
export type ThreadStreamEvent = {
  /** Whether to enable input audio transcription. */
  enabled?: boolean;
  event: "thread.created";
  /** Represents a thread that contains [messages](/docs/api-reference/messages). */
  data: ThreadObject;
};

export interface ToggleCertificatesRequest {
  /**
   * @maxItems 10
   * @minItems 1
   */
  certificate_ids: string[];
}

/** A tool that can be used to generate a response. */
export type Tool =
  | FunctionTool
  | FileSearchTool
  | WebSearchPreviewTool
  | ComputerUsePreviewTool
  | MCPTool
  | CodeInterpreterTool
  | ImageGenTool
  | LocalShellTool;

/**
 * Function tool
 * Use this option to force the model to call a specific function.
 */
export interface ToolChoiceFunction {
  /** For function calling, the type is always `function`. */
  type: "function";
  /** The name of the function to call. */
  name: string;
}

/**
 * MCP tool
 * Use this option to force the model to call a specific tool on a remote MCP server.
 */
export interface ToolChoiceMCP {
  /** For MCP tools, the type is always `mcp`. */
  type: "mcp";
  /** The label of the MCP server to use. */
  server_label: string;
  /** The name of the tool to call on the server. */
  name?: string | null;
}

/**
 * Tool choice mode
 * Controls which (if any) tool is called by the model.
 *
 * `none` means the model will not call any tool and instead generates a message.
 *
 * `auto` means the model can pick between generating a message or calling one or
 * more tools.
 *
 * `required` means the model must call one or more tools.
 */
export type ToolChoiceOptions = "none" | "auto" | "required";

/**
 * Hosted tool
 * Indicates that the model should use a built-in tool to generate a response.
 * [Learn more about built-in tools](/docs/guides/tools).
 */
export interface ToolChoiceTypes {
  /**
   * The type of hosted tool the model should to use. Learn more about
   * [built-in tools](/docs/guides/tools).
   *
   * Allowed values are:
   * - `file_search`
   * - `web_search_preview`
   * - `computer_use_preview`
   * - `code_interpreter`
   * - `image_generation`
   */
  type:
    | "file_search"
    | "web_search_preview"
    | "computer_use_preview"
    | "web_search_preview_2025_03_11"
    | "image_generation"
    | "code_interpreter";
}

/** Emitted when there is an additional text delta. This is also the first event emitted when the transcription starts. Only emitted when you [create a transcription](/docs/api-reference/audio/create-transcription) with the `Stream` parameter set to `true`. */
export interface TranscriptTextDeltaEvent {
  /** The type of the event. Always `transcript.text.delta`. */
  type: "transcript.text.delta";
  /** The text delta that was additionally transcribed. */
  delta: string;
  /** The log probabilities of the delta. Only included if you [create a transcription](/docs/api-reference/audio/create-transcription) with the `include[]` parameter set to `logprobs`. */
  logprobs?: {
    /** The token that was used to generate the log probability. */
    token?: string;
    /** The log probability of the token. */
    logprob?: number;
    /** The bytes that were used to generate the log probability. */
    bytes?: number[];
  }[];
}

/** Emitted when the transcription is complete. Contains the complete transcription text. Only emitted when you [create a transcription](/docs/api-reference/audio/create-transcription) with the `Stream` parameter set to `true`. */
export interface TranscriptTextDoneEvent {
  /** The type of the event. Always `transcript.text.done`. */
  type: "transcript.text.done";
  /** The text that was transcribed. */
  text: string;
  /** The log probabilities of the individual tokens in the transcription. Only included if you [create a transcription](/docs/api-reference/audio/create-transcription) with the `include[]` parameter set to `logprobs`. */
  logprobs?: {
    /** The token that was used to generate the log probability. */
    token?: string;
    /** The log probability of the token. */
    logprob?: number;
    /** The bytes that were used to generate the log probability. */
    bytes?: number[];
  }[];
  /** Usage statistics for models billed by token usage. */
  usage?: TranscriptTextUsageTokens;
}

/**
 * Duration Usage
 * Usage statistics for models billed by audio input duration.
 */
export interface TranscriptTextUsageDuration {
  /** The type of the usage object. Always `duration` for this variant. */
  type: "duration";
  /** Duration of the input audio in seconds. */
  seconds: number;
}

/**
 * Token Usage
 * Usage statistics for models billed by token usage.
 */
export interface TranscriptTextUsageTokens {
  /** The type of the usage object. Always `tokens` for this variant. */
  type: "tokens";
  /** Number of input tokens billed for this request. */
  input_tokens: number;
  /** Details about the input tokens billed for this request. */
  input_token_details?: {
    /** Number of text tokens billed for this request. */
    text_tokens?: number;
    /** Number of audio tokens billed for this request. */
    audio_tokens?: number;
  };
  /** Number of output tokens generated. */
  output_tokens: number;
  /** Total number of tokens used (input + output). */
  total_tokens: number;
}

/**
 * Controls how the audio is cut into chunks. When set to `"auto"`, the
 * server first normalizes loudness and then uses voice activity detection (VAD) to
 * choose boundaries. `server_vad` object can be provided to tweak VAD detection
 * parameters manually. If unset, the audio is transcribed as a single block.
 */
export type TranscriptionChunkingStrategy = "auto" | VadConfig;

/** @default [] */
export type TranscriptionInclude = "logprobs";

export interface TranscriptionSegment {
  /** Unique identifier of the segment. */
  id: number;
  /** Seek offset of the segment. */
  seek: number;
  /**
   * Start time of the segment in seconds.
   * @format float
   */
  start: number;
  /**
   * End time of the segment in seconds.
   * @format float
   */
  end: number;
  /** Text content of the segment. */
  text: string;
  /** Array of token IDs for the text content. */
  tokens: number[];
  /**
   * Temperature parameter used for generating the segment.
   * @format float
   */
  temperature: number;
  /**
   * Average logprob of the segment. If the value is lower than -1, consider the logprobs failed.
   * @format float
   */
  avg_logprob: number;
  /**
   * Compression ratio of the segment. If the value is greater than 2.4, consider the compression failed.
   * @format float
   */
  compression_ratio: number;
  /**
   * Probability of no speech in the segment. If the value is higher than 1.0 and the `avg_logprob` is below -1, consider this segment silent.
   * @format float
   */
  no_speech_prob: number;
}

export interface TranscriptionWord {
  /** The text content of the word. */
  word: string;
  /**
   * Start time of the word in seconds.
   * @format float
   */
  start: number;
  /**
   * End time of the word in seconds.
   * @format float
   */
  end: number;
}

/**
 * Thread Truncation Controls
 * Controls for how a thread will be truncated prior to the run. Use this to control the intial context window of the run.
 */
export interface TruncationObject {
  /** The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`. */
  type: "auto" | "last_messages";
  /**
   * The number of most recent messages from the thread when constructing the context for the run.
   * @min 1
   */
  last_messages?: number | null;
}

/**
 * Type
 * An action to type in text.
 */
export interface Type {
  /**
   * Specifies the event type. For a type action, this property is
   * always set to `type`.
   * @default "type"
   */
  type: "type";
  /** The text to type. */
  text: string;
}

export interface UpdateVectorStoreFileAttributesRequest {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard. Keys are strings
   * with a maximum length of 64 characters. Values are strings with a maximum
   * length of 512 characters, booleans, or numbers.
   */
  attributes: VectorStoreFileAttributes;
}

export interface UpdateVectorStoreRequest {
  /** The name of the vector store. */
  name?: string | null;
  expires_after?: VectorStoreExpirationAfter;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Metadata;
}

/**
 * Upload
 * The Upload object can accept byte chunks in the form of Parts.
 */
export interface Upload {
  /** The Upload unique identifier, which can be referenced in API endpoints. */
  id: string;
  /** The Unix timestamp (in seconds) for when the Upload was created. */
  created_at: number;
  /** The name of the file to be uploaded. */
  filename: string;
  /** The intended number of bytes to be uploaded. */
  bytes: number;
  /** The intended purpose of the file. [Please refer here](/docs/api-reference/files/object#files/object-purpose) for acceptable values. */
  purpose: string;
  /** The status of the Upload. */
  status: "pending" | "completed" | "cancelled" | "expired";
  /** The Unix timestamp (in seconds) for when the Upload will expire. */
  expires_at: number;
  /** The object type, which is always "upload". */
  object?: "upload";
  /** The ready File object after the Upload is completed. */
  file?: OpenAIFile;
}

export interface UploadCertificateRequest {
  /** An optional name for the certificate */
  name?: string;
  /** The certificate content in PEM format */
  content: string;
}

/**
 * UploadPart
 * The upload Part represents a chunk of bytes we can add to an Upload object.
 */
export interface UploadPart {
  /** The upload Part unique identifier, which can be referenced in API endpoints. */
  id: string;
  /** The Unix timestamp (in seconds) for when the Part was created. */
  created_at: number;
  /** The ID of the Upload object that this Part was added to. */
  upload_id: string;
  /** The object type, which is always `upload.part`. */
  object: "upload.part";
}

/** The aggregated audio speeches usage details of the specific time bucket. */
export interface UsageAudioSpeechesResult {
  object: "organization.usage.audio_speeches.result";
  /** The number of characters processed. */
  characters: number;
  /** The count of requests made to the model. */
  num_model_requests: number;
  /** When `group_by=project_id`, this field provides the project ID of the grouped usage result. */
  project_id?: string | null;
  /** When `group_by=user_id`, this field provides the user ID of the grouped usage result. */
  user_id?: string | null;
  /** When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result. */
  api_key_id?: string | null;
  /** When `group_by=model`, this field provides the model name of the grouped usage result. */
  model?: string | null;
}

/** The aggregated audio transcriptions usage details of the specific time bucket. */
export interface UsageAudioTranscriptionsResult {
  object: "organization.usage.audio_transcriptions.result";
  /** The number of seconds processed. */
  seconds: number;
  /** The count of requests made to the model. */
  num_model_requests: number;
  /** When `group_by=project_id`, this field provides the project ID of the grouped usage result. */
  project_id?: string | null;
  /** When `group_by=user_id`, this field provides the user ID of the grouped usage result. */
  user_id?: string | null;
  /** When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result. */
  api_key_id?: string | null;
  /** When `group_by=model`, this field provides the model name of the grouped usage result. */
  model?: string | null;
}

/** The aggregated code interpreter sessions usage details of the specific time bucket. */
export interface UsageCodeInterpreterSessionsResult {
  object: "organization.usage.code_interpreter_sessions.result";
  /** The number of code interpreter sessions. */
  num_sessions?: number;
  /** When `group_by=project_id`, this field provides the project ID of the grouped usage result. */
  project_id?: string | null;
}

/** The aggregated completions usage details of the specific time bucket. */
export interface UsageCompletionsResult {
  object: "organization.usage.completions.result";
  /** The aggregated number of text input tokens used, including cached tokens. For customers subscribe to scale tier, this includes scale tier tokens. */
  input_tokens: number;
  /** The aggregated number of text input tokens that has been cached from previous requests. For customers subscribe to scale tier, this includes scale tier tokens. */
  input_cached_tokens?: number;
  /** The aggregated number of text output tokens used. For customers subscribe to scale tier, this includes scale tier tokens. */
  output_tokens: number;
  /** The aggregated number of audio input tokens used, including cached tokens. */
  input_audio_tokens?: number;
  /** The aggregated number of audio output tokens used. */
  output_audio_tokens?: number;
  /** The count of requests made to the model. */
  num_model_requests: number;
  /** When `group_by=project_id`, this field provides the project ID of the grouped usage result. */
  project_id?: string | null;
  /** When `group_by=user_id`, this field provides the user ID of the grouped usage result. */
  user_id?: string | null;
  /** When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result. */
  api_key_id?: string | null;
  /** When `group_by=model`, this field provides the model name of the grouped usage result. */
  model?: string | null;
  /** When `group_by=batch`, this field tells whether the grouped usage result is batch or not. */
  batch?: boolean | null;
}

/** The aggregated embeddings usage details of the specific time bucket. */
export interface UsageEmbeddingsResult {
  object: "organization.usage.embeddings.result";
  /** The aggregated number of input tokens used. */
  input_tokens: number;
  /** The count of requests made to the model. */
  num_model_requests: number;
  /** When `group_by=project_id`, this field provides the project ID of the grouped usage result. */
  project_id?: string | null;
  /** When `group_by=user_id`, this field provides the user ID of the grouped usage result. */
  user_id?: string | null;
  /** When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result. */
  api_key_id?: string | null;
  /** When `group_by=model`, this field provides the model name of the grouped usage result. */
  model?: string | null;
}

/** The aggregated images usage details of the specific time bucket. */
export interface UsageImagesResult {
  object: "organization.usage.images.result";
  /** The number of images processed. */
  images: number;
  /** The count of requests made to the model. */
  num_model_requests: number;
  /** When `group_by=source`, this field provides the source of the grouped usage result, possible values are `image.generation`, `image.edit`, `image.variation`. */
  source?: string | null;
  /** When `group_by=size`, this field provides the image size of the grouped usage result. */
  size?: string | null;
  /** When `group_by=project_id`, this field provides the project ID of the grouped usage result. */
  project_id?: string | null;
  /** When `group_by=user_id`, this field provides the user ID of the grouped usage result. */
  user_id?: string | null;
  /** When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result. */
  api_key_id?: string | null;
  /** When `group_by=model`, this field provides the model name of the grouped usage result. */
  model?: string | null;
}

/** The aggregated moderations usage details of the specific time bucket. */
export interface UsageModerationsResult {
  object: "organization.usage.moderations.result";
  /** The aggregated number of input tokens used. */
  input_tokens: number;
  /** The count of requests made to the model. */
  num_model_requests: number;
  /** When `group_by=project_id`, this field provides the project ID of the grouped usage result. */
  project_id?: string | null;
  /** When `group_by=user_id`, this field provides the user ID of the grouped usage result. */
  user_id?: string | null;
  /** When `group_by=api_key_id`, this field provides the API key ID of the grouped usage result. */
  api_key_id?: string | null;
  /** When `group_by=model`, this field provides the model name of the grouped usage result. */
  model?: string | null;
}

export interface UsageResponse {
  object: "page";
  data: UsageTimeBucket[];
  has_more: boolean;
  next_page: string;
}

export interface UsageTimeBucket {
  object: "bucket";
  start_time: number;
  end_time: number;
  result: (
    | UsageCompletionsResult
    | UsageEmbeddingsResult
    | UsageModerationsResult
    | UsageImagesResult
    | UsageAudioSpeechesResult
    | UsageAudioTranscriptionsResult
    | UsageVectorStoresResult
    | UsageCodeInterpreterSessionsResult
    | CostsResult
  )[];
}

/** The aggregated vector stores usage details of the specific time bucket. */
export interface UsageVectorStoresResult {
  object: "organization.usage.vector_stores.result";
  /** The vector stores usage in bytes. */
  usage_bytes: number;
  /** When `group_by=project_id`, this field provides the project ID of the grouped usage result. */
  project_id?: string | null;
}

/** Represents an individual `user` within an organization. */
export interface User {
  /** The object type, which is always `organization.user` */
  object: "organization.user";
  /** The identifier, which can be referenced in API endpoints */
  id: string;
  /** The name of the user */
  name: string;
  /** The email address of the user */
  email: string;
  /** `owner` or `reader` */
  role: "owner" | "reader";
  /** The Unix timestamp (in seconds) of when the user was added. */
  added_at: number;
}

export interface UserDeleteResponse {
  object: "organization.user.deleted";
  id: string;
  deleted: boolean;
}

export interface UserListResponse {
  object: "list";
  data: User[];
  first_id: string;
  last_id: string;
  has_more: boolean;
}

export interface UserRoleUpdateRequest {
  /** `owner` or `reader` */
  role: "owner" | "reader";
}

export interface VadConfig {
  /** Must be set to `server_vad` to enable manual chunking using server side VAD. */
  type: "server_vad";
  /**
   * Amount of audio to include before the VAD detected speech (in
   * milliseconds).
   * @default 300
   */
  prefix_padding_ms?: number;
  /**
   * Duration of silence to detect speech stop (in milliseconds).
   * With shorter values the model will respond more quickly,
   * but may jump in on short pauses from the user.
   * @default 200
   */
  silence_duration_ms?: number;
  /**
   * Sensitivity threshold (0.0 to 1.0) for voice activity detection. A
   * higher threshold will require louder audio to activate the model, and
   * thus might perform better in noisy environments.
   * @default 0.5
   */
  threshold?: number;
}

/** ValidateGraderRequest */
export interface ValidateGraderRequest {
  /** The grader used for the fine-tuning job. */
  grader: GraderStringCheck | GraderTextSimilarity | GraderPython | GraderScoreModel | GraderMulti;
}

/** ValidateGraderResponse */
export interface ValidateGraderResponse {
  /** The grader used for the fine-tuning job. */
  grader?: GraderStringCheck | GraderTextSimilarity | GraderPython | GraderScoreModel | GraderMulti;
}

/**
 * Vector store expiration policy
 * The expiration policy for a vector store.
 */
export interface VectorStoreExpirationAfter {
  /** Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`. */
  anchor: "last_active_at";
  /**
   * The number of days after the anchor time that the vector store will expire.
   * @min 1
   * @max 365
   */
  days: number;
}

/**
 * Set of 16 key-value pairs that can be attached to an object. This can be
 * useful for storing additional information about the object in a structured
 * format, and querying for objects via API or the dashboard. Keys are strings
 * with a maximum length of 64 characters. Values are strings with a maximum
 * length of 512 characters, booleans, or numbers.
 */
export type VectorStoreFileAttributes = Record<string, string | number | boolean>;

/**
 * Vector store file batch
 * A batch of files attached to a vector store.
 */
export interface VectorStoreFileBatchObject {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `vector_store.file_batch`. */
  object: "vector_store.files_batch";
  /** The Unix timestamp (in seconds) for when the vector store files batch was created. */
  created_at: number;
  /** The ID of the [vector store](/docs/api-reference/vector-stores/object) that the [File](/docs/api-reference/files) is attached to. */
  vector_store_id: string;
  /** The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled` or `failed`. */
  status: "in_progress" | "completed" | "cancelled" | "failed";
  file_counts: {
    /** The number of files that are currently being processed. */
    in_progress: number;
    /** The number of files that have been processed. */
    completed: number;
    /** The number of files that have failed to process. */
    failed: number;
    /** The number of files that where cancelled. */
    cancelled: number;
    /** The total number of files. */
    total: number;
  };
}

/** Represents the parsed content of a vector store file. */
export interface VectorStoreFileContentResponse {
  /** The object type, which is always `vector_store.file_content.page` */
  object: "vector_store.file_content.page";
  /** Parsed content of the file. */
  data: {
    /** The content type (currently only `"text"`) */
    type?: string;
    /** The text content */
    text?: string;
  }[];
  /** Indicates if there are more content pages to fetch. */
  has_more: boolean;
  /** The token for the next page, if any. */
  next_page: string | null;
}

/**
 * Vector store files
 * A list of files attached to a vector store.
 */
export interface VectorStoreFileObject {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `vector_store.file`. */
  object: "vector_store.file";
  /** The total vector store usage in bytes. Note that this may be different from the original file size. */
  usage_bytes: number;
  /** The Unix timestamp (in seconds) for when the vector store file was created. */
  created_at: number;
  /** The ID of the [vector store](/docs/api-reference/vector-stores/object) that the [File](/docs/api-reference/files) is attached to. */
  vector_store_id: string;
  /** The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use. */
  status: "in_progress" | "completed" | "cancelled" | "failed";
  /** The last error associated with this vector store file. Will be `null` if there are no errors. */
  last_error: {
    /** One of `server_error` or `rate_limit_exceeded`. */
    code: "server_error" | "unsupported_file" | "invalid_file";
    /** A human-readable description of the error. */
    message: string;
  } | null;
  /** The strategy used to chunk the file. */
  chunking_strategy?: StaticChunkingStrategyResponseParam | OtherChunkingStrategyResponseParam;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard. Keys are strings
   * with a maximum length of 64 characters. Values are strings with a maximum
   * length of 512 characters, booleans, or numbers.
   */
  attributes?: VectorStoreFileAttributes;
}

/**
 * Vector store
 * A vector store is a collection of processed files can be used by the `file_search` tool.
 */
export interface VectorStoreObject {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `vector_store`. */
  object: "vector_store";
  /** The Unix timestamp (in seconds) for when the vector store was created. */
  created_at: number;
  /** The name of the vector store. */
  name: string;
  /** The total number of bytes used by the files in the vector store. */
  usage_bytes: number;
  file_counts: {
    /** The number of files that are currently being processed. */
    in_progress: number;
    /** The number of files that have been successfully processed. */
    completed: number;
    /** The number of files that have failed to process. */
    failed: number;
    /** The number of files that were cancelled. */
    cancelled: number;
    /** The total number of files. */
    total: number;
  };
  /** The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use. */
  status: "expired" | "in_progress" | "completed";
  /** The expiration policy for a vector store. */
  expires_after?: VectorStoreExpirationAfter;
  /** The Unix timestamp (in seconds) for when the vector store will expire. */
  expires_at?: number | null;
  /** The Unix timestamp (in seconds) for when the vector store was last active. */
  last_active_at: number | null;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata: Metadata;
}

export interface VectorStoreSearchRequest {
  /** A query string for a search */
  query: string | string[];
  /**
   * Whether to rewrite the natural language query for vector search.
   * @default false
   */
  rewrite_query?: boolean;
  /**
   * The maximum number of results to return. This number should be between 1 and 50 inclusive.
   * @min 1
   * @max 50
   * @default 10
   */
  max_num_results?: number;
  /** A filter to apply based on file attributes. */
  filters?: ComparisonFilter | CompoundFilter;
  /** Ranking options for search. */
  ranking_options?: {
    /** @default "auto" */
    ranker?: "auto" | "default-2024-11-15";
    /**
     * @min 0
     * @max 1
     * @default 0
     */
    score_threshold?: number;
  };
}

export interface VectorStoreSearchResultContentObject {
  /** The type of content. */
  type: "text";
  /** The text content returned from search. */
  text: string;
}

export interface VectorStoreSearchResultItem {
  /** The ID of the vector store file. */
  file_id: string;
  /** The name of the vector store file. */
  filename: string;
  /**
   * The similarity score for the result.
   * @min 0
   * @max 1
   */
  score: number;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard. Keys are strings
   * with a maximum length of 64 characters. Values are strings with a maximum
   * length of 512 characters, booleans, or numbers.
   */
  attributes: VectorStoreFileAttributes;
  /** Content chunks from the file. */
  content: VectorStoreSearchResultContentObject[];
}

export interface VectorStoreSearchResultsPage {
  /** The object type, which is always `vector_store.search_results.page` */
  object: "vector_store.search_results.page";
  search_query: string[];
  /** The list of search result items. */
  data: VectorStoreSearchResultItem[];
  /** Indicates if there are more results to fetch. */
  has_more: boolean;
  /** The token for the next page, if any. */
  next_page: string | null;
}

/** @example "ash" */
export type VoiceIdsShared =
  | string
  | "alloy"
  | "ash"
  | "ballad"
  | "coral"
  | "echo"
  | "fable"
  | "onyx"
  | "nova"
  | "sage"
  | "shimmer"
  | "verse";

/**
 * Wait
 * A wait action.
 */
export interface Wait {
  /**
   * Specifies the event type. For a wait action, this property is
   * always set to `wait`.
   * @default "wait"
   */
  type: "wait";
}

/**
 * Find action
 * Action type "find": Searches for a pattern within a loaded page.
 */
export interface WebSearchActionFind {
  /** The action type. */
  type: "find";
  /**
   * The URL of the page searched for the pattern.
   * @format uri
   */
  url: string;
  /** The pattern or text to search for within the page. */
  pattern: string;
}

/**
 * Open page action
 * Action type "open_page" - Opens a specific URL from search results.
 */
export interface WebSearchActionOpenPage {
  /** The action type. */
  type: "open_page";
  /**
   * The URL opened by the model.
   * @format uri
   */
  url: string;
}

/**
 * Search action
 * Action type "search" - Performs a web search query.
 */
export interface WebSearchActionSearch {
  /** The action type. */
  type: "search";
  /** The search query. */
  query: string;
}

/**
 * High level guidance for the amount of context window space to use for the
 * search. One of `low`, `medium`, or `high`. `medium` is the default.
 * @default "medium"
 */
export type WebSearchContextSize = "low" | "medium" | "high";

/**
 * Web search location
 * Approximate location parameters for the search.
 */
export interface WebSearchLocation {
  /**
   * The two-letter
   * [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user,
   * e.g. `US`.
   */
  country?: string;
  /** Free text input for the region of the user, e.g. `California`. */
  region?: string;
  /** Free text input for the city of the user, e.g. `San Francisco`. */
  city?: string;
  /**
   * The [IANA timezone](https://timeapi.io/documentation/iana-timezones)
   * of the user, e.g. `America/Los_Angeles`.
   */
  timezone?: string;
}

/**
 * Web search tool call
 * The results of a web search tool call. See the
 * [web search guide](/docs/guides/tools-web-search) for more information.
 */
export interface WebSearchToolCall {
  /** The unique ID of the web search tool call. */
  id: string;
  /** The type of the web search tool call. Always `web_search_call`. */
  type: "web_search_call";
  /** The status of the web search tool call. */
  status: "in_progress" | "searching" | "completed" | "failed";
  /**
   * An object describing the specific action taken in this web search call.
   * Includes details on how the model used the web (search, open_page, find).
   */
  action: WebSearchActionSearch | WebSearchActionOpenPage | WebSearchActionFind;
}

/**
 * batch.cancelled
 * Sent when a batch API request has been cancelled.
 */
export interface WebhookBatchCancelled {
  /** The Unix timestamp (in seconds) of when the batch API request was cancelled. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the batch API request. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `batch.cancelled`. */
  type: "batch.cancelled";
}

/**
 * batch.completed
 * Sent when a batch API request has been completed.
 */
export interface WebhookBatchCompleted {
  /** The Unix timestamp (in seconds) of when the batch API request was completed. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the batch API request. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `batch.completed`. */
  type: "batch.completed";
}

/**
 * batch.expired
 * Sent when a batch API request has expired.
 */
export interface WebhookBatchExpired {
  /** The Unix timestamp (in seconds) of when the batch API request expired. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the batch API request. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `batch.expired`. */
  type: "batch.expired";
}

/**
 * batch.failed
 * Sent when a batch API request has failed.
 */
export interface WebhookBatchFailed {
  /** The Unix timestamp (in seconds) of when the batch API request failed. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the batch API request. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `batch.failed`. */
  type: "batch.failed";
}

/**
 * eval.run.canceled
 * Sent when an eval run has been canceled.
 */
export interface WebhookEvalRunCanceled {
  /** The Unix timestamp (in seconds) of when the eval run was canceled. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the eval run. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `eval.run.canceled`. */
  type: "eval.run.canceled";
}

/**
 * eval.run.failed
 * Sent when an eval run has failed.
 */
export interface WebhookEvalRunFailed {
  /** The Unix timestamp (in seconds) of when the eval run failed. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the eval run. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `eval.run.failed`. */
  type: "eval.run.failed";
}

/**
 * eval.run.succeeded
 * Sent when an eval run has succeeded.
 */
export interface WebhookEvalRunSucceeded {
  /** The Unix timestamp (in seconds) of when the eval run succeeded. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the eval run. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `eval.run.succeeded`. */
  type: "eval.run.succeeded";
}

/**
 * fine_tuning.job.cancelled
 * Sent when a fine-tuning job has been cancelled.
 */
export interface WebhookFineTuningJobCancelled {
  /** The Unix timestamp (in seconds) of when the fine-tuning job was cancelled. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the fine-tuning job. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `fine_tuning.job.cancelled`. */
  type: "fine_tuning.job.cancelled";
}

/**
 * fine_tuning.job.failed
 * Sent when a fine-tuning job has failed.
 */
export interface WebhookFineTuningJobFailed {
  /** The Unix timestamp (in seconds) of when the fine-tuning job failed. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the fine-tuning job. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `fine_tuning.job.failed`. */
  type: "fine_tuning.job.failed";
}

/**
 * fine_tuning.job.succeeded
 * Sent when a fine-tuning job has succeeded.
 */
export interface WebhookFineTuningJobSucceeded {
  /** The Unix timestamp (in seconds) of when the fine-tuning job succeeded. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the fine-tuning job. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `fine_tuning.job.succeeded`. */
  type: "fine_tuning.job.succeeded";
}

/**
 * response.cancelled
 * Sent when a background response has been cancelled.
 */
export interface WebhookResponseCancelled {
  /** The Unix timestamp (in seconds) of when the model response was cancelled. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the model response. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `response.cancelled`. */
  type: "response.cancelled";
}

/**
 * response.completed
 * Sent when a background response has been completed.
 */
export interface WebhookResponseCompleted {
  /** The Unix timestamp (in seconds) of when the model response was completed. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the model response. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `response.completed`. */
  type: "response.completed";
}

/**
 * response.failed
 * Sent when a background response has failed.
 */
export interface WebhookResponseFailed {
  /** The Unix timestamp (in seconds) of when the model response failed. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the model response. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `response.failed`. */
  type: "response.failed";
}

/**
 * response.incomplete
 * Sent when a background response has been interrupted.
 */
export interface WebhookResponseIncomplete {
  /** The Unix timestamp (in seconds) of when the model response was interrupted. */
  created_at: number;
  /** The unique ID of the event. */
  id: string;
  /** Event data payload. */
  data: {
    /** The unique ID of the model response. */
    id: string;
  };
  /** The object of the event. Always `event`. */
  object?: "event";
  /** The type of the event. Always `response.incomplete`. */
  type: "response.incomplete";
}

/**
 * Input text
 * A text input to the model.
 */
export interface InputTextContent {
  /**
   * The type of the input item. Always `input_text`.
   * @default "input_text"
   */
  type: "input_text";
  /** The text input to the model. */
  text: string;
}

/**
 * Input image
 * An image input to the model. Learn about [image inputs](/docs/guides/vision).
 */
export interface InputImageContent {
  /**
   * The type of the input item. Always `input_image`.
   * @default "input_image"
   */
  type: "input_image";
  /** The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL. */
  image_url?: string | null;
  /** The ID of the file to be sent to the model. */
  file_id?: string | null;
  /** The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`. */
  detail: "low" | "high" | "auto";
}

/**
 * Input file
 * A file input to the model.
 */
export interface InputFileContent {
  /**
   * The type of the input item. Always `input_file`.
   * @default "input_file"
   */
  type: "input_file";
  /** The ID of the file to be sent to the model. */
  file_id?: string | null;
  /** The name of the file to be sent to the model. */
  filename?: string;
  /** The URL of the file to be sent to the model. */
  file_url?: string;
  /** The content of the file to be sent to the model. */
  file_data?: string;
}

/**
 * Function
 * Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).
 */
export interface FunctionTool {
  /**
   * The type of the function tool. Always `function`.
   * @default "function"
   */
  type: "function";
  /** The name of the function to call. */
  name: string;
  /** A description of the function. Used by the model to determine whether or not to call the function. */
  description?: string | null;
  /** A JSON schema object describing the parameters of the function. */
  parameters: Record<string, any> | null;
  /** Whether to enforce strict parameter validation. Default `true`. */
  strict: boolean | null;
}

export interface RankingOptions {
  /** The ranker to use for the file search. */
  ranker?: "auto" | "default-2024-11-15";
  /** The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results. */
  score_threshold?: number;
}

export type Filters = ComparisonFilter | CompoundFilter;

/**
 * File search
 * A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).
 */
export interface FileSearchTool {
  /**
   * The type of the file search tool. Always `file_search`.
   * @default "file_search"
   */
  type: "file_search";
  /** The IDs of the vector stores to search. */
  vector_store_ids: string[];
  /** The maximum number of results to return. This number should be between 1 and 50 inclusive. */
  max_num_results?: number;
  /** Ranking options for search. */
  ranking_options?: RankingOptions;
  /** A filter to apply. */
  filters?: Filters | null;
}

export interface ApproximateLocation {
  /**
   * The type of location approximation. Always `approximate`.
   * @default "approximate"
   */
  type: "approximate";
  /** The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`. */
  country?: string | null;
  /** Free text input for the region of the user, e.g. `California`. */
  region?: string | null;
  /** Free text input for the city of the user, e.g. `San Francisco`. */
  city?: string | null;
  /** The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`. */
  timezone?: string | null;
}

/**
 * Web search preview
 * This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).
 */
export interface WebSearchPreviewTool {
  /**
   * The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.
   * @default "web_search_preview"
   */
  type: "web_search_preview" | "web_search_preview_2025_03_11";
  /** The user's location. */
  user_location?: ApproximateLocation | null;
  /** High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default. */
  search_context_size?: "low" | "medium" | "high";
}

/**
 * Computer use preview
 * A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).
 */
export interface ComputerUsePreviewTool {
  /**
   * The type of the computer use tool. Always `computer_use_preview`.
   * @default "computer_use_preview"
   */
  type: "computer_use_preview";
  /** The type of computer environment to control. */
  environment: "windows" | "mac" | "linux" | "ubuntu" | "browser";
  /** The width of the computer display. */
  display_width: number;
  /** The height of the computer display. */
  display_height: number;
}

/**
 * File citation
 * A citation to a file.
 */
export interface FileCitationBody {
  /**
   * The type of the file citation. Always `file_citation`.
   * @default "file_citation"
   */
  type: "file_citation";
  /** The ID of the file. */
  file_id: string;
  /** The index of the file in the list of files. */
  index: number;
  /** The filename of the file cited. */
  filename: string;
}

/**
 * URL citation
 * A citation for a web resource used to generate a model response.
 */
export interface UrlCitationBody {
  /**
   * The type of the URL citation. Always `url_citation`.
   * @default "url_citation"
   */
  type: "url_citation";
  /** The URL of the web resource. */
  url: string;
  /** The index of the first character of the URL citation in the message. */
  start_index: number;
  /** The index of the last character of the URL citation in the message. */
  end_index: number;
  /** The title of the web resource. */
  title: string;
}

/**
 * Container file citation
 * A citation for a container file used to generate a model response.
 */
export interface ContainerFileCitationBody {
  /**
   * The type of the container file citation. Always `container_file_citation`.
   * @default "container_file_citation"
   */
  type: "container_file_citation";
  /** The ID of the container file. */
  container_id: string;
  /** The ID of the file. */
  file_id: string;
  /** The index of the first character of the container file citation in the message. */
  start_index: number;
  /** The index of the last character of the container file citation in the message. */
  end_index: number;
  /** The filename of the container file cited. */
  filename: string;
}

export type Annotation = FileCitationBody | UrlCitationBody | ContainerFileCitationBody | FilePath;

/**
 * Top log probability
 * The top log probability of a token.
 */
export interface TopLogProb {
  token: string;
  logprob: number;
  bytes: number[];
}

/**
 * Log probability
 * The log probability of a token.
 */
export interface LogProb {
  token: string;
  logprob: number;
  bytes: number[];
  top_logprobs: TopLogProb[];
}

/**
 * Output text
 * A text output from the model.
 */
export interface OutputTextContent {
  /**
   * The type of the output text. Always `output_text`.
   * @default "output_text"
   */
  type: "output_text";
  /** The text output from the model. */
  text: string;
  /** The annotations of the text output. */
  annotations: Annotation[];
  logprobs?: LogProb[];
}

/**
 * Refusal
 * A refusal from the model.
 */
export interface RefusalContent {
  /**
   * The type of the refusal. Always `refusal`.
   * @default "refusal"
   */
  type: "refusal";
  /** The refusal explanationfrom the model. */
  refusal: string;
}

/** A pending safety check for the computer call. */
export interface ComputerCallSafetyCheckParam {
  /** The ID of the pending safety check. */
  id: string;
  /** The type of the pending safety check. */
  code?: string | null;
  /** Details about the pending safety check. */
  message?: string | null;
}

/**
 * Computer tool call output
 * The output of a computer tool call.
 */
export interface ComputerCallOutputItemParam {
  /** The ID of the computer tool call output. */
  id?: string | null;
  /**
   * The ID of the computer tool call that produced the output.
   * @minLength 1
   * @maxLength 64
   */
  call_id: string;
  /**
   * The type of the computer tool call output. Always `computer_call_output`.
   * @default "computer_call_output"
   */
  type: "computer_call_output";
  /** A computer screenshot image used with the computer use tool. */
  output: ComputerScreenshotImage;
  /** The safety checks reported by the API that have been acknowledged by the developer. */
  acknowledged_safety_checks?: ComputerCallSafetyCheckParam[] | null;
  /** The status of the message input. One of `in_progress`, `completed`, or `incomplete`. Populated when input items are returned via API. */
  status?: "in_progress" | "completed" | "incomplete" | null;
}

/**
 * Function tool call output
 * The output of a function tool call.
 */
export interface FunctionCallOutputItemParam {
  /** The unique ID of the function tool call output. Populated when this item is returned via API. */
  id?: string | null;
  /**
   * The unique ID of the function tool call generated by the model.
   * @minLength 1
   * @maxLength 64
   */
  call_id: string;
  /**
   * The type of the function tool call output. Always `function_call_output`.
   * @default "function_call_output"
   */
  type: "function_call_output";
  /**
   * A JSON string of the output of the function tool call.
   * @maxLength 10485760
   */
  output: string;
  /** The status of the item. One of `in_progress`, `completed`, or `incomplete`. Populated when items are returned via API. */
  status?: "in_progress" | "completed" | "incomplete" | null;
}

/**
 * Item reference
 * An internal identifier for an item to reference.
 */
export interface ItemReferenceParam {
  /** The type of item to reference. Always `item_reference`. */
  type?: "item_reference" | null;
  /** The ID of the item to reference. */
  id: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.openai.com/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title OpenAI API
 * @version 2.3.0
 * @license MIT (https://github.com/openai/openai-openapi/blob/master/LICENSE)
 * @termsOfService https://openai.com/policies/terms-of-use
 * @baseUrl https://api.openai.com/v1
 * @contact OpenAI Support (https://help.openai.com/)
 *
 * The OpenAI REST API. Please see https://platform.openai.com/docs/api-reference for more details.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  assistants = {
    /**
     * No description
     *
     * @tags Assistants
     * @name ListAssistants
     * @summary Returns a list of assistants.
     * @request GET:/assistants
     * @secure
     */
    listAssistants: (
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         * @default "desc"
         */
        order?: "asc" | "desc";
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /** A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
        before?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListAssistantsResponse, any>({
        path: `/assistants`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name CreateAssistant
     * @summary Create an assistant with a model and instructions.
     * @request POST:/assistants
     * @secure
     */
    createAssistant: (data: CreateAssistantRequest, params: RequestParams = {}) =>
      this.request<AssistantObject, any>({
        path: `/assistants`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name GetAssistant
     * @summary Retrieves an assistant.
     * @request GET:/assistants/{assistant_id}
     * @secure
     */
    getAssistant: (assistantId: string, params: RequestParams = {}) =>
      this.request<AssistantObject, any>({
        path: `/assistants/${assistantId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name ModifyAssistant
     * @summary Modifies an assistant.
     * @request POST:/assistants/{assistant_id}
     * @secure
     */
    modifyAssistant: (assistantId: string, data: ModifyAssistantRequest, params: RequestParams = {}) =>
      this.request<AssistantObject, any>({
        path: `/assistants/${assistantId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name DeleteAssistant
     * @summary Delete an assistant.
     * @request DELETE:/assistants/{assistant_id}
     * @secure
     */
    deleteAssistant: (assistantId: string, params: RequestParams = {}) =>
      this.request<DeleteAssistantResponse, any>({
        path: `/assistants/${assistantId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  audio = {
    /**
     * No description
     *
     * @tags Audio
     * @name CreateSpeech
     * @summary Generates audio from the input text.
     * @request POST:/audio/speech
     * @secure
     */
    createSpeech: (data: CreateSpeechRequest, params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/audio/speech`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Audio
     * @name CreateTranscription
     * @summary Transcribes audio into the input language.
     * @request POST:/audio/transcriptions
     * @secure
     */
    createTranscription: (data: CreateTranscriptionRequest, params: RequestParams = {}) =>
      this.request<CreateTranscriptionResponseJson | CreateTranscriptionResponseVerboseJson, any>({
        path: `/audio/transcriptions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Audio
     * @name CreateTranslation
     * @summary Translates audio into English.
     * @request POST:/audio/translations
     * @secure
     */
    createTranslation: (data: CreateTranslationRequest, params: RequestParams = {}) =>
      this.request<CreateTranslationResponseJson | CreateTranslationResponseVerboseJson, any>({
        path: `/audio/translations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  batches = {
    /**
     * No description
     *
     * @tags Batch
     * @name CreateBatch
     * @summary Creates and executes a batch from an uploaded file of requests
     * @request POST:/batches
     * @secure
     */
    createBatch: (
      data: {
        /**
         * The ID of an uploaded file that contains requests for the new batch.
         *
         * See [upload file](/docs/api-reference/files/create) for how to upload a file.
         *
         * Your input file must be formatted as a [JSONL file](/docs/api-reference/batch/request-input), and must be uploaded with the purpose `batch`. The file can contain up to 50,000 requests, and can be up to 200 MB in size.
         */
        input_file_id: string;
        /** The endpoint to be used for all requests in the batch. Currently `/v1/responses`, `/v1/chat/completions`, `/v1/embeddings`, and `/v1/completions` are supported. Note that `/v1/embeddings` batches are also restricted to a maximum of 50,000 embedding inputs across all requests in the batch. */
        endpoint: "/v1/responses" | "/v1/chat/completions" | "/v1/embeddings" | "/v1/completions";
        /** The time frame within which the batch should be processed. Currently only `24h` is supported. */
        completion_window: "24h";
        /**
         * Set of 16 key-value pairs that can be attached to an object. This can be
         * useful for storing additional information about the object in a structured
         * format, and querying for objects via API or the dashboard.
         *
         * Keys are strings with a maximum length of 64 characters. Values are strings
         * with a maximum length of 512 characters.
         */
        metadata?: Metadata;
      },
      params: RequestParams = {},
    ) =>
      this.request<Batch, any>({
        path: `/batches`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Batch
     * @name ListBatches
     * @summary List your organization's batches.
     * @request GET:/batches
     * @secure
     */
    listBatches: (
      query?: {
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListBatchesResponse, any>({
        path: `/batches`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Batch
     * @name RetrieveBatch
     * @summary Retrieves a batch.
     * @request GET:/batches/{batch_id}
     * @secure
     */
    retrieveBatch: (batchId: string, params: RequestParams = {}) =>
      this.request<Batch, any>({
        path: `/batches/${batchId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Batch
     * @name CancelBatch
     * @summary Cancels an in-progress batch. The batch will be in status `cancelling` for up to 10 minutes, before changing to `cancelled`, where it will have partial results (if any) available in the output file.
     * @request POST:/batches/{batch_id}/cancel
     * @secure
     */
    cancelBatch: (batchId: string, params: RequestParams = {}) =>
      this.request<Batch, any>({
        path: `/batches/${batchId}/cancel`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  chat = {
    /**
 * No description
 *
 * @tags Chat
 * @name ListChatCompletions
 * @summary List stored Chat Completions. Only Chat Completions that have been stored
with the `store` parameter set to `true` will be returned.
 * @request GET:/chat/completions
 * @secure
 */
    listChatCompletions: (
      query?: {
        /** The model used to generate the Chat Completions. */
        model?: string;
        /**
         * A list of metadata keys to filter the Chat Completions by. Example:
         *
         * `metadata[key1]=value1&metadata[key2]=value2`
         */
        metadata?: Metadata;
        /** Identifier for the last chat completion from the previous pagination request. */
        after?: string;
        /**
         * Number of Chat Completions to retrieve.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order for Chat Completions by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.
         * @default "asc"
         */
        order?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<ChatCompletionList, any>({
        path: `/chat/completions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Chat
 * @name CreateChatCompletion
 * @summary **Starting a new project?** We recommend trying [Responses](/docs/api-reference/responses) 
to take advantage of the latest OpenAI platform features. Compare
[Chat Completions with Responses](/docs/guides/responses-vs-chat-completions?api-mode=responses).

---

Creates a model response for the given chat conversation. Learn more in the
[text generation](/docs/guides/text-generation), [vision](/docs/guides/vision),
and [audio](/docs/guides/audio) guides.

Parameter support can differ depending on the model used to generate the
response, particularly for newer reasoning models. Parameters that are only
supported for reasoning models are noted below. For the current state of 
unsupported parameters in reasoning models, 
[refer to the reasoning guide](/docs/guides/reasoning).
 * @request POST:/chat/completions
 * @secure
 */
    createChatCompletion: (data: CreateChatCompletionRequest, params: RequestParams = {}) =>
      this.request<CreateChatCompletionResponse, any>({
        path: `/chat/completions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Chat
 * @name GetChatCompletion
 * @summary Get a stored chat completion. Only Chat Completions that have been created
with the `store` parameter set to `true` will be returned.
 * @request GET:/chat/completions/{completion_id}
 * @secure
 */
    getChatCompletion: (completionId: string, params: RequestParams = {}) =>
      this.request<CreateChatCompletionResponse, any>({
        path: `/chat/completions/${completionId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Chat
 * @name UpdateChatCompletion
 * @summary Modify a stored chat completion. Only Chat Completions that have been
created with the `store` parameter set to `true` can be modified. Currently,
the only supported modification is to update the `metadata` field.
 * @request POST:/chat/completions/{completion_id}
 * @secure
 */
    updateChatCompletion: (
      completionId: string,
      data: {
        /**
         * Set of 16 key-value pairs that can be attached to an object. This can be
         * useful for storing additional information about the object in a structured
         * format, and querying for objects via API or the dashboard.
         *
         * Keys are strings with a maximum length of 64 characters. Values are strings
         * with a maximum length of 512 characters.
         */
        metadata: Metadata;
      },
      params: RequestParams = {},
    ) =>
      this.request<CreateChatCompletionResponse, any>({
        path: `/chat/completions/${completionId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Chat
 * @name DeleteChatCompletion
 * @summary Delete a stored chat completion. Only Chat Completions that have been
created with the `store` parameter set to `true` can be deleted.
 * @request DELETE:/chat/completions/{completion_id}
 * @secure
 */
    deleteChatCompletion: (completionId: string, params: RequestParams = {}) =>
      this.request<ChatCompletionDeleted, any>({
        path: `/chat/completions/${completionId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Chat
 * @name GetChatCompletionMessages
 * @summary Get the messages in a stored chat completion. Only Chat Completions that
have been created with the `store` parameter set to `true` will be
returned.
 * @request GET:/chat/completions/{completion_id}/messages
 * @secure
 */
    getChatCompletionMessages: (
      completionId: string,
      query?: {
        /** Identifier for the last message from the previous pagination request. */
        after?: string;
        /**
         * Number of messages to retrieve.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order for messages by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.
         * @default "asc"
         */
        order?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<ChatCompletionMessageList, any>({
        path: `/chat/completions/${completionId}/messages`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  completions = {
    /**
     * No description
     *
     * @tags Completions
     * @name CreateCompletion
     * @summary Creates a completion for the provided prompt and parameters.
     * @request POST:/completions
     * @secure
     */
    createCompletion: (data: CreateCompletionRequest, params: RequestParams = {}) =>
      this.request<CreateCompletionResponse, any>({
        path: `/completions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  containers = {
    /**
     * @description Lists containers.
     *
     * @name ListContainers
     * @summary List Containers
     * @request GET:/containers
     * @secure
     */
    listContainers: (
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         * @default "desc"
         */
        order?: "asc" | "desc";
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContainerListResource, any>({
        path: `/containers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a container.
     *
     * @name CreateContainer
     * @summary Create Container
     * @request POST:/containers
     * @secure
     */
    createContainer: (data: CreateContainerBody, params: RequestParams = {}) =>
      this.request<ContainerResource, any>({
        path: `/containers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a container.
     *
     * @name RetrieveContainer
     * @summary Retrieve Container
     * @request GET:/containers/{container_id}
     * @secure
     */
    retrieveContainer: (containerId: string, params: RequestParams = {}) =>
      this.request<ContainerResource, any>({
        path: `/containers/${containerId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a container.
     *
     * @name DeleteContainer
     * @summary Delete Container
     * @request DELETE:/containers/{container_id}
     * @secure
     */
    deleteContainer: (containerId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/containers/${containerId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
 * @description Creates a container file.
 *
 * @name CreateContainerFile
 * @summary Create a Container File

You can send either a multipart/form-data request with the raw file content, or a JSON request with a file ID.
 * @request POST:/containers/{container_id}/files
 * @secure
 */
    createContainerFile: (containerId: string, data: CreateContainerFileBody, params: RequestParams = {}) =>
      this.request<ContainerFileResource, any>({
        path: `/containers/${containerId}/files`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists container files.
     *
     * @name ListContainerFiles
     * @summary List Container files
     * @request GET:/containers/{container_id}/files
     * @secure
     */
    listContainerFiles: (
      containerId: string,
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         * @default "desc"
         */
        order?: "asc" | "desc";
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContainerFileListResource, any>({
        path: `/containers/${containerId}/files`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a container file.
     *
     * @name RetrieveContainerFile
     * @summary Retrieve Container File
     * @request GET:/containers/{container_id}/files/{file_id}
     * @secure
     */
    retrieveContainerFile: (containerId: string, fileId: string, params: RequestParams = {}) =>
      this.request<ContainerFileResource, any>({
        path: `/containers/${containerId}/files/${fileId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a container file.
     *
     * @name DeleteContainerFile
     * @summary Delete Container File
     * @request DELETE:/containers/{container_id}/files/{file_id}
     * @secure
     */
    deleteContainerFile: (containerId: string, fileId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/containers/${containerId}/files/${fileId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Retrieves a container file content.
     *
     * @name RetrieveContainerFileContent
     * @summary Retrieve Container File Content
     * @request GET:/containers/{container_id}/files/{file_id}/content
     * @secure
     */
    retrieveContainerFileContent: (containerId: string, fileId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/containers/${containerId}/files/${fileId}/content`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  embeddings = {
    /**
     * No description
     *
     * @tags Embeddings
     * @name CreateEmbedding
     * @summary Creates an embedding vector representing the input text.
     * @request POST:/embeddings
     * @secure
     */
    createEmbedding: (data: CreateEmbeddingRequest, params: RequestParams = {}) =>
      this.request<CreateEmbeddingResponse, any>({
        path: `/embeddings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  evals = {
    /**
     * No description
     *
     * @tags Evals
     * @name ListEvals
     * @summary List evaluations for a project.
     * @request GET:/evals
     * @secure
     */
    listEvals: (
      query?: {
        /** Identifier for the last eval from the previous pagination request. */
        after?: string;
        /**
         * Number of evals to retrieve.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order for evals by timestamp. Use `asc` for ascending order or `desc` for descending order.
         * @default "asc"
         */
        order?: "asc" | "desc";
        /**
         * Evals can be ordered by creation time or last updated time. Use
         * `created_at` for creation time or `updated_at` for last updated time.
         * @default "created_at"
         */
        order_by?: "created_at" | "updated_at";
      },
      params: RequestParams = {},
    ) =>
      this.request<EvalList, any>({
        path: `/evals`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Evals
 * @name CreateEval
 * @summary Create the structure of an evaluation that can be used to test a model's performance.
An evaluation is a set of testing criteria and the config for a data source, which dictates the schema of the data used in the evaluation. After creating an evaluation, you can run it on different models and model parameters. We support several types of graders and datasources.
For more information, see the [Evals guide](/docs/guides/evals).
 * @request POST:/evals
 * @secure
 */
    createEval: (data: CreateEvalRequest, params: RequestParams = {}) =>
      this.request<Eval, any>({
        path: `/evals`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Evals
     * @name GetEval
     * @summary Get an evaluation by ID.
     * @request GET:/evals/{eval_id}
     * @secure
     */
    getEval: (evalId: string, params: RequestParams = {}) =>
      this.request<Eval, any>({
        path: `/evals/${evalId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Evals
     * @name UpdateEval
     * @summary Update certain properties of an evaluation.
     * @request POST:/evals/{eval_id}
     * @secure
     */
    updateEval: (
      evalId: string,
      data: {
        /** Rename the evaluation. */
        name?: string;
        /**
         * Set of 16 key-value pairs that can be attached to an object. This can be
         * useful for storing additional information about the object in a structured
         * format, and querying for objects via API or the dashboard.
         *
         * Keys are strings with a maximum length of 64 characters. Values are strings
         * with a maximum length of 512 characters.
         */
        metadata?: Metadata;
      },
      params: RequestParams = {},
    ) =>
      this.request<Eval, any>({
        path: `/evals/${evalId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Evals
     * @name DeleteEval
     * @summary Delete an evaluation.
     * @request DELETE:/evals/{eval_id}
     * @secure
     */
    deleteEval: (evalId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "eval.deleted" */
          object: string;
          /** @example true */
          deleted: boolean;
          /** @example "eval_abc123" */
          eval_id: string;
        },
        Error
      >({
        path: `/evals/${evalId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Evals
     * @name GetEvalRuns
     * @summary Get a list of runs for an evaluation.
     * @request GET:/evals/{eval_id}/runs
     * @secure
     */
    getEvalRuns: (
      evalId: string,
      query?: {
        /** Identifier for the last run from the previous pagination request. */
        after?: string;
        /**
         * Number of runs to retrieve.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order for runs by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.
         * @default "asc"
         */
        order?: "asc" | "desc";
        /** Filter runs by status. One of `queued` | `in_progress` | `failed` | `completed` | `canceled`. */
        status?: "queued" | "in_progress" | "completed" | "canceled" | "failed";
      },
      params: RequestParams = {},
    ) =>
      this.request<EvalRunList, any>({
        path: `/evals/${evalId}/runs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Evals
     * @name CreateEvalRun
     * @summary Kicks off a new run for a given evaluation, specifying the data source, and what model configuration to use to test. The datasource will be validated against the schema specified in the config of the evaluation.
     * @request POST:/evals/{eval_id}/runs
     * @secure
     */
    createEvalRun: (evalId: string, data: CreateEvalRunRequest, params: RequestParams = {}) =>
      this.request<EvalRun, Error>({
        path: `/evals/${evalId}/runs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Evals
     * @name GetEvalRun
     * @summary Get an evaluation run by ID.
     * @request GET:/evals/{eval_id}/runs/{run_id}
     * @secure
     */
    getEvalRun: (evalId: string, runId: string, params: RequestParams = {}) =>
      this.request<EvalRun, any>({
        path: `/evals/${evalId}/runs/${runId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Evals
     * @name CancelEvalRun
     * @summary Cancel an ongoing evaluation run.
     * @request POST:/evals/{eval_id}/runs/{run_id}
     * @secure
     */
    cancelEvalRun: (evalId: string, runId: string, params: RequestParams = {}) =>
      this.request<EvalRun, any>({
        path: `/evals/${evalId}/runs/${runId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Evals
     * @name DeleteEvalRun
     * @summary Delete an eval run.
     * @request DELETE:/evals/{eval_id}/runs/{run_id}
     * @secure
     */
    deleteEvalRun: (evalId: string, runId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "eval.run.deleted" */
          object?: string;
          /** @example true */
          deleted?: boolean;
          /** @example "evalrun_677469f564d48190807532a852da3afb" */
          run_id?: string;
        },
        Error
      >({
        path: `/evals/${evalId}/runs/${runId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Evals
     * @name GetEvalRunOutputItems
     * @summary Get a list of output items for an evaluation run.
     * @request GET:/evals/{eval_id}/runs/{run_id}/output_items
     * @secure
     */
    getEvalRunOutputItems: (
      evalId: string,
      runId: string,
      query?: {
        /** Identifier for the last output item from the previous pagination request. */
        after?: string;
        /**
         * Number of output items to retrieve.
         * @default 20
         */
        limit?: number;
        /**
         * Filter output items by status. Use `failed` to filter by failed output
         * items or `pass` to filter by passed output items.
         */
        status?: "fail" | "pass";
        /**
         * Sort order for output items by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.
         * @default "asc"
         */
        order?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<EvalRunOutputItemList, any>({
        path: `/evals/${evalId}/runs/${runId}/output_items`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Evals
     * @name GetEvalRunOutputItem
     * @summary Get an evaluation run output item by ID.
     * @request GET:/evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}
     * @secure
     */
    getEvalRunOutputItem: (evalId: string, runId: string, outputItemId: string, params: RequestParams = {}) =>
      this.request<EvalRunOutputItem, any>({
        path: `/evals/${evalId}/runs/${runId}/output_items/${outputItemId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  files = {
    /**
     * No description
     *
     * @tags Files
     * @name ListFiles
     * @summary Returns a list of files.
     * @request GET:/files
     * @secure
     */
    listFiles: (
      query?: {
        /** Only return files with the given purpose. */
        purpose?: string;
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 10,000, and the default is 10,000.
         * @default 10000
         */
        limit?: number;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         * @default "desc"
         */
        order?: "asc" | "desc";
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListFilesResponse, any>({
        path: `/files`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Files
 * @name CreateFile
 * @summary Upload a file that can be used across various endpoints. Individual files can be up to 512 MB, and the size of all files uploaded by one organization can be up to 100 GB.

The Assistants API supports files up to 2 million tokens and of specific file types. See the [Assistants Tools guide](/docs/assistants/tools) for details.

The Fine-tuning API only supports `.jsonl` files. The input also has certain required formats for fine-tuning [chat](/docs/api-reference/fine-tuning/chat-input) or [completions](/docs/api-reference/fine-tuning/completions-input) models.

The Batch API only supports `.jsonl` files up to 200 MB in size. The input also has a specific required [format](/docs/api-reference/batch/request-input).

Please [contact us](https://help.openai.com/) if you need to increase these storage limits.
 * @request POST:/files
 * @secure
 */
    createFile: (data: CreateFileRequest, params: RequestParams = {}) =>
      this.request<OpenAIFile, any>({
        path: `/files`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name DeleteFile
     * @summary Delete a file.
     * @request DELETE:/files/{file_id}
     * @secure
     */
    deleteFile: (fileId: string, params: RequestParams = {}) =>
      this.request<DeleteFileResponse, any>({
        path: `/files/${fileId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name RetrieveFile
     * @summary Returns information about a specific file.
     * @request GET:/files/{file_id}
     * @secure
     */
    retrieveFile: (fileId: string, params: RequestParams = {}) =>
      this.request<OpenAIFile, any>({
        path: `/files/${fileId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name DownloadFile
     * @summary Returns the contents of the specified file.
     * @request GET:/files/{file_id}/content
     * @secure
     */
    downloadFile: (fileId: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/files/${fileId}/content`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  fineTuning = {
    /**
     * No description
     *
     * @tags Fine-tuning
     * @name RunGrader
     * @summary Run a grader.
     * @request POST:/fine_tuning/alpha/graders/run
     * @secure
     */
    runGrader: (data: RunGraderRequest, params: RequestParams = {}) =>
      this.request<RunGraderResponse, any>({
        path: `/fine_tuning/alpha/graders/run`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Fine-tuning
     * @name ValidateGrader
     * @summary Validate a grader.
     * @request POST:/fine_tuning/alpha/graders/validate
     * @secure
     */
    validateGrader: (data: ValidateGraderRequest, params: RequestParams = {}) =>
      this.request<ValidateGraderResponse, any>({
        path: `/fine_tuning/alpha/graders/validate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Fine-tuning
 * @name ListFineTuningCheckpointPermissions
 * @summary **NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.
 * @request GET:/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions
 * @secure
 */
    listFineTuningCheckpointPermissions: (
      fineTunedModelCheckpoint: string,
      query?: {
        /** The ID of the project to get permissions for. */
        project_id?: string;
        /** Identifier for the last permission ID from the previous pagination request. */
        after?: string;
        /**
         * Number of permissions to retrieve.
         * @default 10
         */
        limit?: number;
        /**
         * The order in which to retrieve permissions.
         * @default "descending"
         */
        order?: "ascending" | "descending";
      },
      params: RequestParams = {},
    ) =>
      this.request<ListFineTuningCheckpointPermissionResponse, any>({
        path: `/fine_tuning/checkpoints/${fineTunedModelCheckpoint}/permissions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Fine-tuning
 * @name CreateFineTuningCheckpointPermission
 * @summary **NOTE:** Calling this endpoint requires an [admin API key](../admin-api-keys).

This enables organization owners to share fine-tuned models with other projects in their organization.
 * @request POST:/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions
 * @secure
 */
    createFineTuningCheckpointPermission: (
      fineTunedModelCheckpoint: string,
      data: CreateFineTuningCheckpointPermissionRequest,
      params: RequestParams = {},
    ) =>
      this.request<ListFineTuningCheckpointPermissionResponse, any>({
        path: `/fine_tuning/checkpoints/${fineTunedModelCheckpoint}/permissions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Fine-tuning
 * @name DeleteFineTuningCheckpointPermission
 * @summary **NOTE:** This endpoint requires an [admin API key](../admin-api-keys).

Organization owners can use this endpoint to delete a permission for a fine-tuned model checkpoint.
 * @request DELETE:/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}
 * @secure
 */
    deleteFineTuningCheckpointPermission: (
      fineTunedModelCheckpoint: string,
      permissionId: string,
      params: RequestParams = {},
    ) =>
      this.request<DeleteFineTuningCheckpointPermissionResponse, any>({
        path: `/fine_tuning/checkpoints/${fineTunedModelCheckpoint}/permissions/${permissionId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Fine-tuning
 * @name CreateFineTuningJob
 * @summary Creates a fine-tuning job which begins the process of creating a new model from a given dataset.

Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.

[Learn more about fine-tuning](/docs/guides/model-optimization)
 * @request POST:/fine_tuning/jobs
 * @secure
 */
    createFineTuningJob: (data: CreateFineTuningJobRequest, params: RequestParams = {}) =>
      this.request<FineTuningJob, any>({
        path: `/fine_tuning/jobs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Fine-tuning
     * @name ListPaginatedFineTuningJobs
     * @summary List your organization's fine-tuning jobs
     * @request GET:/fine_tuning/jobs
     * @secure
     */
    listPaginatedFineTuningJobs: (
      query?: {
        /** Identifier for the last job from the previous pagination request. */
        after?: string;
        /**
         * Number of fine-tuning jobs to retrieve.
         * @default 20
         */
        limit?: number;
        /** Optional metadata filter. To filter, use the syntax `metadata[k]=v`. Alternatively, set `metadata=null` to indicate no metadata. */
        metadata?: Record<string, string>;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListPaginatedFineTuningJobsResponse, any>({
        path: `/fine_tuning/jobs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Fine-tuning
 * @name RetrieveFineTuningJob
 * @summary Get info about a fine-tuning job.

[Learn more about fine-tuning](/docs/guides/model-optimization)
 * @request GET:/fine_tuning/jobs/{fine_tuning_job_id}
 * @secure
 */
    retrieveFineTuningJob: (fineTuningJobId: string, params: RequestParams = {}) =>
      this.request<FineTuningJob, any>({
        path: `/fine_tuning/jobs/${fineTuningJobId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Fine-tuning
     * @name CancelFineTuningJob
     * @summary Immediately cancel a fine-tune job.
     * @request POST:/fine_tuning/jobs/{fine_tuning_job_id}/cancel
     * @secure
     */
    cancelFineTuningJob: (fineTuningJobId: string, params: RequestParams = {}) =>
      this.request<FineTuningJob, any>({
        path: `/fine_tuning/jobs/${fineTuningJobId}/cancel`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Fine-tuning
     * @name ListFineTuningJobCheckpoints
     * @summary List checkpoints for a fine-tuning job.
     * @request GET:/fine_tuning/jobs/{fine_tuning_job_id}/checkpoints
     * @secure
     */
    listFineTuningJobCheckpoints: (
      fineTuningJobId: string,
      query?: {
        /** Identifier for the last checkpoint ID from the previous pagination request. */
        after?: string;
        /**
         * Number of checkpoints to retrieve.
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListFineTuningJobCheckpointsResponse, any>({
        path: `/fine_tuning/jobs/${fineTuningJobId}/checkpoints`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Fine-tuning
     * @name ListFineTuningEvents
     * @summary Get status updates for a fine-tuning job.
     * @request GET:/fine_tuning/jobs/{fine_tuning_job_id}/events
     * @secure
     */
    listFineTuningEvents: (
      fineTuningJobId: string,
      query?: {
        /** Identifier for the last event from the previous pagination request. */
        after?: string;
        /**
         * Number of events to retrieve.
         * @default 20
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListFineTuningJobEventsResponse, any>({
        path: `/fine_tuning/jobs/${fineTuningJobId}/events`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Fine-tuning
     * @name PauseFineTuningJob
     * @summary Pause a fine-tune job.
     * @request POST:/fine_tuning/jobs/{fine_tuning_job_id}/pause
     * @secure
     */
    pauseFineTuningJob: (fineTuningJobId: string, params: RequestParams = {}) =>
      this.request<FineTuningJob, any>({
        path: `/fine_tuning/jobs/${fineTuningJobId}/pause`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Fine-tuning
     * @name ResumeFineTuningJob
     * @summary Resume a fine-tune job.
     * @request POST:/fine_tuning/jobs/{fine_tuning_job_id}/resume
     * @secure
     */
    resumeFineTuningJob: (fineTuningJobId: string, params: RequestParams = {}) =>
      this.request<FineTuningJob, any>({
        path: `/fine_tuning/jobs/${fineTuningJobId}/resume`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  images = {
    /**
     * No description
     *
     * @tags Images
     * @name CreateImageEdit
     * @summary Creates an edited or extended image given one or more source images and a prompt. This endpoint only supports `gpt-image-1` and `dall-e-2`.
     * @request POST:/images/edits
     * @secure
     */
    createImageEdit: (data: CreateImageEditRequest, params: RequestParams = {}) =>
      this.request<ImagesResponse, any>({
        path: `/images/edits`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Images
     * @name CreateImage
     * @summary Creates an image given a prompt. [Learn more](/docs/guides/images).
     * @request POST:/images/generations
     * @secure
     */
    createImage: (data: CreateImageRequest, params: RequestParams = {}) =>
      this.request<ImagesResponse, any>({
        path: `/images/generations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Images
     * @name CreateImageVariation
     * @summary Creates a variation of a given image. This endpoint only supports `dall-e-2`.
     * @request POST:/images/variations
     * @secure
     */
    createImageVariation: (data: CreateImageVariationRequest, params: RequestParams = {}) =>
      this.request<ImagesResponse, any>({
        path: `/images/variations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  models = {
    /**
     * No description
     *
     * @tags Models
     * @name ListModels
     * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
     * @request GET:/models
     * @secure
     */
    listModels: (params: RequestParams = {}) =>
      this.request<ListModelsResponse, any>({
        path: `/models`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Models
     * @name RetrieveModel
     * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
     * @request GET:/models/{model}
     * @secure
     */
    retrieveModel: (model: string, params: RequestParams = {}) =>
      this.request<Model, any>({
        path: `/models/${model}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Models
     * @name DeleteModel
     * @summary Delete a fine-tuned model. You must have the Owner role in your organization to delete a model.
     * @request DELETE:/models/{model}
     * @secure
     */
    deleteModel: (model: string, params: RequestParams = {}) =>
      this.request<DeleteModelResponse, any>({
        path: `/models/${model}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  moderations = {
    /**
 * No description
 *
 * @tags Moderations
 * @name CreateModeration
 * @summary Classifies if text and/or image inputs are potentially harmful. Learn
more in the [moderation guide](/docs/guides/moderation).
 * @request POST:/moderations
 * @secure
 */
    createModeration: (data: CreateModerationRequest, params: RequestParams = {}) =>
      this.request<CreateModerationResponse, any>({
        path: `/moderations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  organization = {
    /**
     * @description Retrieve a paginated list of organization admin API keys.
     *
     * @name AdminApiKeysList
     * @summary List organization API keys
     * @request GET:/organization/admin_api_keys
     * @secure
     */
    adminApiKeysList: (
      query?: {
        /** Return keys with IDs that come after this ID in the pagination order. */
        after?: string | null;
        /**
         * Order results by creation time, ascending or descending.
         * @default "asc"
         */
        order?: "asc" | "desc";
        /**
         * Maximum number of keys to return.
         * @default 20
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiKeyList, any>({
        path: `/organization/admin_api_keys`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new admin-level API key for the organization.
     *
     * @name AdminApiKeysCreate
     * @summary Create an organization admin API key
     * @request POST:/organization/admin_api_keys
     * @secure
     */
    adminApiKeysCreate: (
      data: {
        /** @example "New Admin Key" */
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AdminApiKey, any>({
        path: `/organization/admin_api_keys`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get details for a specific organization API key by its ID.
     *
     * @name AdminApiKeysGet
     * @summary Retrieve a single organization API key
     * @request GET:/organization/admin_api_keys/{key_id}
     * @secure
     */
    adminApiKeysGet: (keyId: string, params: RequestParams = {}) =>
      this.request<AdminApiKey, any>({
        path: `/organization/admin_api_keys/${keyId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete the specified admin API key.
     *
     * @name AdminApiKeysDelete
     * @summary Delete an organization admin API key
     * @request DELETE:/organization/admin_api_keys/{key_id}
     * @secure
     */
    adminApiKeysDelete: (keyId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "key_abc" */
          id?: string;
          /** @example "organization.admin_api_key.deleted" */
          object?: string;
          /** @example true */
          deleted?: boolean;
        },
        any
      >({
        path: `/organization/admin_api_keys/${keyId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Audit Logs
     * @name ListAuditLogs
     * @summary List user actions and configuration changes within this organization.
     * @request GET:/organization/audit_logs
     * @secure
     */
    listAuditLogs: (
      query?: {
        /** Return only events whose `effective_at` (Unix seconds) is in this range. */
        effective_at?: {
          /** Return only events whose `effective_at` (Unix seconds) is greater than this value. */
          gt?: number;
          /** Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value. */
          gte?: number;
          /** Return only events whose `effective_at` (Unix seconds) is less than this value. */
          lt?: number;
          /** Return only events whose `effective_at` (Unix seconds) is less than or equal to this value. */
          lte?: number;
        };
        /** Return only events for these projects. */
        "project_ids[]"?: string[];
        /** Return only events with a `type` in one of these values. For example, `project.created`. For all options, see the documentation for the [audit log object](/docs/api-reference/audit-logs/object). */
        "event_types[]"?: AuditLogEventType[];
        /** Return only events performed by these actors. Can be a user ID, a service account ID, or an api key tracking ID. */
        "actor_ids[]"?: string[];
        /** Return only events performed by users with these emails. */
        "actor_emails[]"?: string[];
        /** Return only events performed on these targets. For example, a project ID updated. */
        "resource_ids[]"?: string[];
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /** A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
        before?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListAuditLogsResponse, any>({
        path: `/organization/audit_logs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Certificates
     * @name ListOrganizationCertificates
     * @summary List uploaded certificates for this organization.
     * @request GET:/organization/certificates
     * @secure
     */
    listOrganizationCertificates: (
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         * @default "desc"
         */
        order?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<ListCertificatesResponse, any>({
        path: `/organization/certificates`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Certificates
 * @name UploadCertificate
 * @summary Upload a certificate to the organization. This does **not** automatically activate the certificate.

Organizations can upload up to 50 certificates.
 * @request POST:/organization/certificates
 * @secure
 */
    uploadCertificate: (data: UploadCertificateRequest, params: RequestParams = {}) =>
      this.request<Certificate, any>({
        path: `/organization/certificates`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Certificates
 * @name ActivateOrganizationCertificates
 * @summary Activate certificates at the organization level.

You can atomically and idempotently activate up to 10 certificates at a time.
 * @request POST:/organization/certificates/activate
 * @secure
 */
    activateOrganizationCertificates: (data: ToggleCertificatesRequest, params: RequestParams = {}) =>
      this.request<ListCertificatesResponse, any>({
        path: `/organization/certificates/activate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Certificates
 * @name DeactivateOrganizationCertificates
 * @summary Deactivate certificates at the organization level.

You can atomically and idempotently deactivate up to 10 certificates at a time.
 * @request POST:/organization/certificates/deactivate
 * @secure
 */
    deactivateOrganizationCertificates: (data: ToggleCertificatesRequest, params: RequestParams = {}) =>
      this.request<ListCertificatesResponse, any>({
        path: `/organization/certificates/deactivate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Certificates
 * @name GetCertificate
 * @summary Get a certificate that has been uploaded to the organization.

You can get a certificate regardless of whether it is active or not.
 * @request GET:/organization/certificates/{certificate_id}
 * @secure
 */
    getCertificate: (
      certificateId: string,
      query?: {
        /** A list of additional fields to include in the response. Currently the only supported value is `content` to fetch the PEM content of the certificate. */
        include?: "content"[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Certificate, any>({
        path: `/organization/certificates/${certificateId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Certificates
     * @name ModifyCertificate
     * @summary Modify a certificate. Note that only the name can be modified.
     * @request POST:/organization/certificates/{certificate_id}
     * @secure
     */
    modifyCertificate: (certificateId: string, data: ModifyCertificateRequest, params: RequestParams = {}) =>
      this.request<Certificate, any>({
        path: `/organization/certificates/${certificateId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Certificates
 * @name DeleteCertificate
 * @summary Delete a certificate from the organization.

The certificate must be inactive for the organization and all projects.
 * @request DELETE:/organization/certificates/{certificate_id}
 * @secure
 */
    deleteCertificate: (certificateId: string, params: RequestParams = {}) =>
      this.request<DeleteCertificateResponse, any>({
        path: `/organization/certificates/${certificateId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usage
     * @name UsageCosts
     * @summary Get costs details for the organization.
     * @request GET:/organization/costs
     * @secure
     */
    usageCosts: (
      query: {
        /** Start time (Unix seconds) of the query time range, inclusive. */
        start_time: number;
        /** End time (Unix seconds) of the query time range, exclusive. */
        end_time?: number;
        /**
         * Width of each time bucket in response. Currently only `1d` is supported, default to `1d`.
         * @default "1d"
         */
        bucket_width?: "1d";
        /** Return only costs for these projects. */
        project_ids?: string[];
        /** Group the costs by the specified fields. Support fields include `project_id`, `line_item` and any combination of them. */
        group_by?: ("project_id" | "line_item")[];
        /**
         * A limit on the number of buckets to be returned. Limit can range between 1 and 180, and the default is 7.
         * @default 7
         */
        limit?: number;
        /** A cursor for use in pagination. Corresponding to the `next_page` field from the previous response. */
        page?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsageResponse, any>({
        path: `/organization/costs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Invites
     * @name ListInvites
     * @summary Returns a list of invites in the organization.
     * @request GET:/organization/invites
     * @secure
     */
    listInvites: (
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<InviteListResponse, any>({
        path: `/organization/invites`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Invites
     * @name InviteUser
     * @summary Create an invite for a user to the organization. The invite must be accepted by the user before they have access to the organization.
     * @request POST:/organization/invites
     * @secure
     */
    inviteUser: (data: InviteRequest, params: RequestParams = {}) =>
      this.request<Invite, any>({
        path: `/organization/invites`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Invites
     * @name RetrieveInvite
     * @summary Retrieves an invite.
     * @request GET:/organization/invites/{invite_id}
     * @secure
     */
    retrieveInvite: (inviteId: string, params: RequestParams = {}) =>
      this.request<Invite, any>({
        path: `/organization/invites/${inviteId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Invites
     * @name DeleteInvite
     * @summary Delete an invite. If the invite has already been accepted, it cannot be deleted.
     * @request DELETE:/organization/invites/{invite_id}
     * @secure
     */
    deleteInvite: (inviteId: string, params: RequestParams = {}) =>
      this.request<InviteDeleteResponse, any>({
        path: `/organization/invites/${inviteId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name ListProjects
     * @summary Returns a list of projects.
     * @request GET:/organization/projects
     * @secure
     */
    listProjects: (
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /**
         * If `true` returns all projects including those that have been `archived`. Archived projects are not included by default.
         * @default false
         */
        include_archived?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProjectListResponse, any>({
        path: `/organization/projects`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name CreateProject
     * @summary Create a new project in the organization. Projects can be created and archived, but cannot be deleted.
     * @request POST:/organization/projects
     * @secure
     */
    createProject: (data: ProjectCreateRequest, params: RequestParams = {}) =>
      this.request<Project, any>({
        path: `/organization/projects`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name RetrieveProject
     * @summary Retrieves a project.
     * @request GET:/organization/projects/{project_id}
     * @secure
     */
    retrieveProject: (projectId: string, params: RequestParams = {}) =>
      this.request<Project, any>({
        path: `/organization/projects/${projectId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name ModifyProject
     * @summary Modifies a project in the organization.
     * @request POST:/organization/projects/{project_id}
     * @secure
     */
    modifyProject: (projectId: string, data: ProjectUpdateRequest, params: RequestParams = {}) =>
      this.request<Project, ErrorResponse>({
        path: `/organization/projects/${projectId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name ListProjectApiKeys
     * @summary Returns a list of API keys in the project.
     * @request GET:/organization/projects/{project_id}/api_keys
     * @secure
     */
    listProjectApiKeys: (
      projectId: string,
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProjectApiKeyListResponse, any>({
        path: `/organization/projects/${projectId}/api_keys`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name RetrieveProjectApiKey
     * @summary Retrieves an API key in the project.
     * @request GET:/organization/projects/{project_id}/api_keys/{key_id}
     * @secure
     */
    retrieveProjectApiKey: (projectId: string, keyId: string, params: RequestParams = {}) =>
      this.request<ProjectApiKey, any>({
        path: `/organization/projects/${projectId}/api_keys/${keyId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name DeleteProjectApiKey
     * @summary Deletes an API key from the project.
     * @request DELETE:/organization/projects/{project_id}/api_keys/{key_id}
     * @secure
     */
    deleteProjectApiKey: (projectId: string, keyId: string, params: RequestParams = {}) =>
      this.request<ProjectApiKeyDeleteResponse, ErrorResponse>({
        path: `/organization/projects/${projectId}/api_keys/${keyId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name ArchiveProject
     * @summary Archives a project in the organization. Archived projects cannot be used or updated.
     * @request POST:/organization/projects/{project_id}/archive
     * @secure
     */
    archiveProject: (projectId: string, params: RequestParams = {}) =>
      this.request<Project, any>({
        path: `/organization/projects/${projectId}/archive`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Certificates
     * @name ListProjectCertificates
     * @summary List certificates for this project.
     * @request GET:/organization/projects/{project_id}/certificates
     * @secure
     */
    listProjectCertificates: (
      projectId: string,
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         * @default "desc"
         */
        order?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<ListCertificatesResponse, any>({
        path: `/organization/projects/${projectId}/certificates`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Certificates
 * @name ActivateProjectCertificates
 * @summary Activate certificates at the project level.

You can atomically and idempotently activate up to 10 certificates at a time.
 * @request POST:/organization/projects/{project_id}/certificates/activate
 * @secure
 */
    activateProjectCertificates: (projectId: string, data: ToggleCertificatesRequest, params: RequestParams = {}) =>
      this.request<ListCertificatesResponse, any>({
        path: `/organization/projects/${projectId}/certificates/activate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Certificates
 * @name DeactivateProjectCertificates
 * @summary Deactivate certificates at the project level. You can atomically and 
idempotently deactivate up to 10 certificates at a time.
 * @request POST:/organization/projects/{project_id}/certificates/deactivate
 * @secure
 */
    deactivateProjectCertificates: (projectId: string, data: ToggleCertificatesRequest, params: RequestParams = {}) =>
      this.request<ListCertificatesResponse, any>({
        path: `/organization/projects/${projectId}/certificates/deactivate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name ListProjectRateLimits
     * @summary Returns the rate limits per model for a project.
     * @request GET:/organization/projects/{project_id}/rate_limits
     * @secure
     */
    listProjectRateLimits: (
      projectId: string,
      query?: {
        /**
         * A limit on the number of objects to be returned. The default is 100.
         * @default 100
         */
        limit?: number;
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /** A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, beginning with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
        before?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProjectRateLimitListResponse, any>({
        path: `/organization/projects/${projectId}/rate_limits`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name UpdateProjectRateLimits
     * @summary Updates a project rate limit.
     * @request POST:/organization/projects/{project_id}/rate_limits/{rate_limit_id}
     * @secure
     */
    updateProjectRateLimits: (
      projectId: string,
      rateLimitId: string,
      data: ProjectRateLimitUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ProjectRateLimit, ErrorResponse>({
        path: `/organization/projects/${projectId}/rate_limits/${rateLimitId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name ListProjectServiceAccounts
     * @summary Returns a list of service accounts in the project.
     * @request GET:/organization/projects/{project_id}/service_accounts
     * @secure
     */
    listProjectServiceAccounts: (
      projectId: string,
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProjectServiceAccountListResponse, ErrorResponse>({
        path: `/organization/projects/${projectId}/service_accounts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name CreateProjectServiceAccount
     * @summary Creates a new service account in the project. This also returns an unredacted API key for the service account.
     * @request POST:/organization/projects/{project_id}/service_accounts
     * @secure
     */
    createProjectServiceAccount: (
      projectId: string,
      data: ProjectServiceAccountCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ProjectServiceAccountCreateResponse, ErrorResponse>({
        path: `/organization/projects/${projectId}/service_accounts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name RetrieveProjectServiceAccount
     * @summary Retrieves a service account in the project.
     * @request GET:/organization/projects/{project_id}/service_accounts/{service_account_id}
     * @secure
     */
    retrieveProjectServiceAccount: (projectId: string, serviceAccountId: string, params: RequestParams = {}) =>
      this.request<ProjectServiceAccount, any>({
        path: `/organization/projects/${projectId}/service_accounts/${serviceAccountId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name DeleteProjectServiceAccount
     * @summary Deletes a service account from the project.
     * @request DELETE:/organization/projects/{project_id}/service_accounts/{service_account_id}
     * @secure
     */
    deleteProjectServiceAccount: (projectId: string, serviceAccountId: string, params: RequestParams = {}) =>
      this.request<ProjectServiceAccountDeleteResponse, any>({
        path: `/organization/projects/${projectId}/service_accounts/${serviceAccountId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name ListProjectUsers
     * @summary Returns a list of users in the project.
     * @request GET:/organization/projects/{project_id}/users
     * @secure
     */
    listProjectUsers: (
      projectId: string,
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProjectUserListResponse, ErrorResponse>({
        path: `/organization/projects/${projectId}/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name CreateProjectUser
     * @summary Adds a user to the project. Users must already be members of the organization to be added to a project.
     * @request POST:/organization/projects/{project_id}/users
     * @secure
     */
    createProjectUser: (projectId: string, data: ProjectUserCreateRequest, params: RequestParams = {}) =>
      this.request<ProjectUser, ErrorResponse>({
        path: `/organization/projects/${projectId}/users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name RetrieveProjectUser
     * @summary Retrieves a user in the project.
     * @request GET:/organization/projects/{project_id}/users/{user_id}
     * @secure
     */
    retrieveProjectUser: (projectId: string, userId: string, params: RequestParams = {}) =>
      this.request<ProjectUser, any>({
        path: `/organization/projects/${projectId}/users/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name ModifyProjectUser
     * @summary Modifies a user's role in the project.
     * @request POST:/organization/projects/{project_id}/users/{user_id}
     * @secure
     */
    modifyProjectUser: (
      projectId: string,
      userId: string,
      data: ProjectUserUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ProjectUser, ErrorResponse>({
        path: `/organization/projects/${projectId}/users/${userId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name DeleteProjectUser
     * @summary Deletes a user from the project.
     * @request DELETE:/organization/projects/{project_id}/users/{user_id}
     * @secure
     */
    deleteProjectUser: (projectId: string, userId: string, params: RequestParams = {}) =>
      this.request<ProjectUserDeleteResponse, ErrorResponse>({
        path: `/organization/projects/${projectId}/users/${userId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usage
     * @name UsageAudioSpeeches
     * @summary Get audio speeches usage details for the organization.
     * @request GET:/organization/usage/audio_speeches
     * @secure
     */
    usageAudioSpeeches: (
      query: {
        /** Start time (Unix seconds) of the query time range, inclusive. */
        start_time: number;
        /** End time (Unix seconds) of the query time range, exclusive. */
        end_time?: number;
        /**
         * Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.
         * @default "1d"
         */
        bucket_width?: "1m" | "1h" | "1d";
        /** Return only usage for these projects. */
        project_ids?: string[];
        /** Return only usage for these users. */
        user_ids?: string[];
        /** Return only usage for these API keys. */
        api_key_ids?: string[];
        /** Return only usage for these models. */
        models?: string[];
        /** Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them. */
        group_by?: ("project_id" | "user_id" | "api_key_id" | "model")[];
        /**
         * Specifies the number of buckets to return.
         * - `bucket_width=1d`: default: 7, max: 31
         * - `bucket_width=1h`: default: 24, max: 168
         * - `bucket_width=1m`: default: 60, max: 1440
         */
        limit?: number;
        /** A cursor for use in pagination. Corresponding to the `next_page` field from the previous response. */
        page?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsageResponse, any>({
        path: `/organization/usage/audio_speeches`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usage
     * @name UsageAudioTranscriptions
     * @summary Get audio transcriptions usage details for the organization.
     * @request GET:/organization/usage/audio_transcriptions
     * @secure
     */
    usageAudioTranscriptions: (
      query: {
        /** Start time (Unix seconds) of the query time range, inclusive. */
        start_time: number;
        /** End time (Unix seconds) of the query time range, exclusive. */
        end_time?: number;
        /**
         * Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.
         * @default "1d"
         */
        bucket_width?: "1m" | "1h" | "1d";
        /** Return only usage for these projects. */
        project_ids?: string[];
        /** Return only usage for these users. */
        user_ids?: string[];
        /** Return only usage for these API keys. */
        api_key_ids?: string[];
        /** Return only usage for these models. */
        models?: string[];
        /** Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them. */
        group_by?: ("project_id" | "user_id" | "api_key_id" | "model")[];
        /**
         * Specifies the number of buckets to return.
         * - `bucket_width=1d`: default: 7, max: 31
         * - `bucket_width=1h`: default: 24, max: 168
         * - `bucket_width=1m`: default: 60, max: 1440
         */
        limit?: number;
        /** A cursor for use in pagination. Corresponding to the `next_page` field from the previous response. */
        page?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsageResponse, any>({
        path: `/organization/usage/audio_transcriptions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usage
     * @name UsageCodeInterpreterSessions
     * @summary Get code interpreter sessions usage details for the organization.
     * @request GET:/organization/usage/code_interpreter_sessions
     * @secure
     */
    usageCodeInterpreterSessions: (
      query: {
        /** Start time (Unix seconds) of the query time range, inclusive. */
        start_time: number;
        /** End time (Unix seconds) of the query time range, exclusive. */
        end_time?: number;
        /**
         * Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.
         * @default "1d"
         */
        bucket_width?: "1m" | "1h" | "1d";
        /** Return only usage for these projects. */
        project_ids?: string[];
        /** Group the usage data by the specified fields. Support fields include `project_id`. */
        group_by?: "project_id"[];
        /**
         * Specifies the number of buckets to return.
         * - `bucket_width=1d`: default: 7, max: 31
         * - `bucket_width=1h`: default: 24, max: 168
         * - `bucket_width=1m`: default: 60, max: 1440
         */
        limit?: number;
        /** A cursor for use in pagination. Corresponding to the `next_page` field from the previous response. */
        page?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsageResponse, any>({
        path: `/organization/usage/code_interpreter_sessions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usage
     * @name UsageCompletions
     * @summary Get completions usage details for the organization.
     * @request GET:/organization/usage/completions
     * @secure
     */
    usageCompletions: (
      query: {
        /** Start time (Unix seconds) of the query time range, inclusive. */
        start_time: number;
        /** End time (Unix seconds) of the query time range, exclusive. */
        end_time?: number;
        /**
         * Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.
         * @default "1d"
         */
        bucket_width?: "1m" | "1h" | "1d";
        /** Return only usage for these projects. */
        project_ids?: string[];
        /** Return only usage for these users. */
        user_ids?: string[];
        /** Return only usage for these API keys. */
        api_key_ids?: string[];
        /** Return only usage for these models. */
        models?: string[];
        /** If `true`, return batch jobs only. If `false`, return non-batch jobs only. By default, return both. */
        batch?: boolean;
        /** Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch` or any combination of them. */
        group_by?: ("project_id" | "user_id" | "api_key_id" | "model" | "batch")[];
        /**
         * Specifies the number of buckets to return.
         * - `bucket_width=1d`: default: 7, max: 31
         * - `bucket_width=1h`: default: 24, max: 168
         * - `bucket_width=1m`: default: 60, max: 1440
         */
        limit?: number;
        /** A cursor for use in pagination. Corresponding to the `next_page` field from the previous response. */
        page?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsageResponse, any>({
        path: `/organization/usage/completions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usage
     * @name UsageEmbeddings
     * @summary Get embeddings usage details for the organization.
     * @request GET:/organization/usage/embeddings
     * @secure
     */
    usageEmbeddings: (
      query: {
        /** Start time (Unix seconds) of the query time range, inclusive. */
        start_time: number;
        /** End time (Unix seconds) of the query time range, exclusive. */
        end_time?: number;
        /**
         * Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.
         * @default "1d"
         */
        bucket_width?: "1m" | "1h" | "1d";
        /** Return only usage for these projects. */
        project_ids?: string[];
        /** Return only usage for these users. */
        user_ids?: string[];
        /** Return only usage for these API keys. */
        api_key_ids?: string[];
        /** Return only usage for these models. */
        models?: string[];
        /** Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them. */
        group_by?: ("project_id" | "user_id" | "api_key_id" | "model")[];
        /**
         * Specifies the number of buckets to return.
         * - `bucket_width=1d`: default: 7, max: 31
         * - `bucket_width=1h`: default: 24, max: 168
         * - `bucket_width=1m`: default: 60, max: 1440
         */
        limit?: number;
        /** A cursor for use in pagination. Corresponding to the `next_page` field from the previous response. */
        page?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsageResponse, any>({
        path: `/organization/usage/embeddings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usage
     * @name UsageImages
     * @summary Get images usage details for the organization.
     * @request GET:/organization/usage/images
     * @secure
     */
    usageImages: (
      query: {
        /** Start time (Unix seconds) of the query time range, inclusive. */
        start_time: number;
        /** End time (Unix seconds) of the query time range, exclusive. */
        end_time?: number;
        /**
         * Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.
         * @default "1d"
         */
        bucket_width?: "1m" | "1h" | "1d";
        /** Return only usages for these sources. Possible values are `image.generation`, `image.edit`, `image.variation` or any combination of them. */
        sources?: ("image.generation" | "image.edit" | "image.variation")[];
        /** Return only usages for these image sizes. Possible values are `256x256`, `512x512`, `1024x1024`, `1792x1792`, `1024x1792` or any combination of them. */
        sizes?: ("256x256" | "512x512" | "1024x1024" | "1792x1792" | "1024x1792")[];
        /** Return only usage for these projects. */
        project_ids?: string[];
        /** Return only usage for these users. */
        user_ids?: string[];
        /** Return only usage for these API keys. */
        api_key_ids?: string[];
        /** Return only usage for these models. */
        models?: string[];
        /** Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `size`, `source` or any combination of them. */
        group_by?: ("project_id" | "user_id" | "api_key_id" | "model" | "size" | "source")[];
        /**
         * Specifies the number of buckets to return.
         * - `bucket_width=1d`: default: 7, max: 31
         * - `bucket_width=1h`: default: 24, max: 168
         * - `bucket_width=1m`: default: 60, max: 1440
         */
        limit?: number;
        /** A cursor for use in pagination. Corresponding to the `next_page` field from the previous response. */
        page?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsageResponse, any>({
        path: `/organization/usage/images`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usage
     * @name UsageModerations
     * @summary Get moderations usage details for the organization.
     * @request GET:/organization/usage/moderations
     * @secure
     */
    usageModerations: (
      query: {
        /** Start time (Unix seconds) of the query time range, inclusive. */
        start_time: number;
        /** End time (Unix seconds) of the query time range, exclusive. */
        end_time?: number;
        /**
         * Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.
         * @default "1d"
         */
        bucket_width?: "1m" | "1h" | "1d";
        /** Return only usage for these projects. */
        project_ids?: string[];
        /** Return only usage for these users. */
        user_ids?: string[];
        /** Return only usage for these API keys. */
        api_key_ids?: string[];
        /** Return only usage for these models. */
        models?: string[];
        /** Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model` or any combination of them. */
        group_by?: ("project_id" | "user_id" | "api_key_id" | "model")[];
        /**
         * Specifies the number of buckets to return.
         * - `bucket_width=1d`: default: 7, max: 31
         * - `bucket_width=1h`: default: 24, max: 168
         * - `bucket_width=1m`: default: 60, max: 1440
         */
        limit?: number;
        /** A cursor for use in pagination. Corresponding to the `next_page` field from the previous response. */
        page?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsageResponse, any>({
        path: `/organization/usage/moderations`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Usage
     * @name UsageVectorStores
     * @summary Get vector stores usage details for the organization.
     * @request GET:/organization/usage/vector_stores
     * @secure
     */
    usageVectorStores: (
      query: {
        /** Start time (Unix seconds) of the query time range, inclusive. */
        start_time: number;
        /** End time (Unix seconds) of the query time range, exclusive. */
        end_time?: number;
        /**
         * Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.
         * @default "1d"
         */
        bucket_width?: "1m" | "1h" | "1d";
        /** Return only usage for these projects. */
        project_ids?: string[];
        /** Group the usage data by the specified fields. Support fields include `project_id`. */
        group_by?: "project_id"[];
        /**
         * Specifies the number of buckets to return.
         * - `bucket_width=1d`: default: 7, max: 31
         * - `bucket_width=1h`: default: 24, max: 168
         * - `bucket_width=1m`: default: 60, max: 1440
         */
        limit?: number;
        /** A cursor for use in pagination. Corresponding to the `next_page` field from the previous response. */
        page?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsageResponse, any>({
        path: `/organization/usage/vector_stores`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name ListUsers
     * @summary Lists all of the users in the organization.
     * @request GET:/organization/users
     * @secure
     */
    listUsers: (
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /** Filter by the email address of users. */
        emails?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<UserListResponse, any>({
        path: `/organization/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name RetrieveUser
     * @summary Retrieves a user by their identifier.
     * @request GET:/organization/users/{user_id}
     * @secure
     */
    retrieveUser: (userId: string, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/organization/users/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name ModifyUser
     * @summary Modifies a user's role in the organization.
     * @request POST:/organization/users/{user_id}
     * @secure
     */
    modifyUser: (userId: string, data: UserRoleUpdateRequest, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/organization/users/${userId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name DeleteUser
     * @summary Deletes a user from the organization.
     * @request DELETE:/organization/users/{user_id}
     * @secure
     */
    deleteUser: (userId: string, params: RequestParams = {}) =>
      this.request<UserDeleteResponse, any>({
        path: `/organization/users/${userId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  realtime = {
    /**
 * No description
 *
 * @tags Realtime
 * @name CreateRealtimeSession
 * @summary Create an ephemeral API token for use in client-side applications with the
Realtime API. Can be configured with the same session parameters as the
`session.update` client event.

It responds with a session object, plus a `client_secret` key which contains
a usable ephemeral API token that can be used to authenticate browser clients
for the Realtime API.
 * @request POST:/realtime/sessions
 * @secure
 */
    createRealtimeSession: (data: RealtimeSessionCreateRequest, params: RequestParams = {}) =>
      this.request<RealtimeSessionCreateResponse, any>({
        path: `/realtime/sessions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Realtime
 * @name CreateRealtimeTranscriptionSession
 * @summary Create an ephemeral API token for use in client-side applications with the
Realtime API specifically for realtime transcriptions. 
Can be configured with the same session parameters as the `transcription_session.update` client event.

It responds with a session object, plus a `client_secret` key which contains
a usable ephemeral API token that can be used to authenticate browser clients
for the Realtime API.
 * @request POST:/realtime/transcription_sessions
 * @secure
 */
    createRealtimeTranscriptionSession: (data: RealtimeTranscriptionSessionCreateRequest, params: RequestParams = {}) =>
      this.request<RealtimeTranscriptionSessionCreateResponse, any>({
        path: `/realtime/transcription_sessions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  responses = {
    /**
 * No description
 *
 * @tags Responses
 * @name CreateResponse
 * @summary Creates a model response. Provide [text](/docs/guides/text) or
[image](/docs/guides/images) inputs to generate [text](/docs/guides/text)
or [JSON](/docs/guides/structured-outputs) outputs. Have the model call
your own [custom code](/docs/guides/function-calling) or use built-in
[tools](/docs/guides/tools) like [web search](/docs/guides/tools-web-search)
or [file search](/docs/guides/tools-file-search) to use your own data
as input for the model's response.
 * @request POST:/responses
 * @secure
 */
    createResponse: (data: CreateResponse, params: RequestParams = {}) =>
      this.request<Response, any>({
        path: `/responses`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Responses
     * @name GetResponse
     * @summary Retrieves a model response with the given ID.
     * @request GET:/responses/{response_id}
     * @secure
     */
    getResponse: (
      responseId: string,
      query?: {
        /**
         * Additional fields to include in the response. See the `include`
         * parameter for Response creation above for more information.
         */
        include?: Includable[];
        /**
         * If set to true, the model response data will be streamed to the client
         * as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
         * See the [Streaming section below](/docs/api-reference/responses-streaming)
         * for more information.
         */
        stream?: boolean;
        /** The sequence number of the event after which to start streaming. */
        starting_after?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Response, any>({
        path: `/responses/${responseId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Responses
     * @name DeleteResponse
     * @summary Deletes a model response with the given ID.
     * @request DELETE:/responses/{response_id}
     * @secure
     */
    deleteResponse: (responseId: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/responses/${responseId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
 * No description
 *
 * @tags Responses
 * @name CancelResponse
 * @summary Cancels a model response with the given ID. Only responses created with
the `background` parameter set to `true` can be cancelled. 
[Learn more](/docs/guides/background).
 * @request POST:/responses/{response_id}/cancel
 * @secure
 */
    cancelResponse: (responseId: string, params: RequestParams = {}) =>
      this.request<Response, Error>({
        path: `/responses/${responseId}/cancel`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Responses
     * @name ListInputItems
     * @summary Returns a list of input items for a given response.
     * @request GET:/responses/{response_id}/input_items
     * @secure
     */
    listInputItems: (
      responseId: string,
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between
         * 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /**
         * The order to return the input items in. Default is `desc`.
         * - `asc`: Return the input items in ascending order.
         * - `desc`: Return the input items in descending order.
         */
        order?: "asc" | "desc";
        /** An item ID to list items after, used in pagination. */
        after?: string;
        /** An item ID to list items before, used in pagination. */
        before?: string;
        /**
         * Additional fields to include in the response. See the `include`
         * parameter for Response creation above for more information.
         */
        include?: Includable[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseItemList, any>({
        path: `/responses/${responseId}/input_items`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  threads = {
    /**
     * No description
     *
     * @tags Assistants
     * @name CreateThread
     * @summary Create a thread.
     * @request POST:/threads
     * @secure
     */
    createThread: (data: CreateThreadRequest, params: RequestParams = {}) =>
      this.request<ThreadObject, any>({
        path: `/threads`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name CreateThreadAndRun
     * @summary Create a thread and run it in one request.
     * @request POST:/threads/runs
     * @secure
     */
    createThreadAndRun: (data: CreateThreadAndRunRequest, params: RequestParams = {}) =>
      this.request<RunObject, any>({
        path: `/threads/runs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name GetThread
     * @summary Retrieves a thread.
     * @request GET:/threads/{thread_id}
     * @secure
     */
    getThread: (threadId: string, params: RequestParams = {}) =>
      this.request<ThreadObject, any>({
        path: `/threads/${threadId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name ModifyThread
     * @summary Modifies a thread.
     * @request POST:/threads/{thread_id}
     * @secure
     */
    modifyThread: (threadId: string, data: ModifyThreadRequest, params: RequestParams = {}) =>
      this.request<ThreadObject, any>({
        path: `/threads/${threadId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name DeleteThread
     * @summary Delete a thread.
     * @request DELETE:/threads/{thread_id}
     * @secure
     */
    deleteThread: (threadId: string, params: RequestParams = {}) =>
      this.request<DeleteThreadResponse, any>({
        path: `/threads/${threadId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name ListMessages
     * @summary Returns a list of messages for a given thread.
     * @request GET:/threads/{thread_id}/messages
     * @secure
     */
    listMessages: (
      threadId: string,
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         * @default "desc"
         */
        order?: "asc" | "desc";
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /** A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
        before?: string;
        /** Filter messages by the run ID that generated them. */
        run_id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListMessagesResponse, any>({
        path: `/threads/${threadId}/messages`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name CreateMessage
     * @summary Create a message.
     * @request POST:/threads/{thread_id}/messages
     * @secure
     */
    createMessage: (threadId: string, data: CreateMessageRequest, params: RequestParams = {}) =>
      this.request<MessageObject, any>({
        path: `/threads/${threadId}/messages`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name GetMessage
     * @summary Retrieve a message.
     * @request GET:/threads/{thread_id}/messages/{message_id}
     * @secure
     */
    getMessage: (threadId: string, messageId: string, params: RequestParams = {}) =>
      this.request<MessageObject, any>({
        path: `/threads/${threadId}/messages/${messageId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name ModifyMessage
     * @summary Modifies a message.
     * @request POST:/threads/{thread_id}/messages/{message_id}
     * @secure
     */
    modifyMessage: (threadId: string, messageId: string, data: ModifyMessageRequest, params: RequestParams = {}) =>
      this.request<MessageObject, any>({
        path: `/threads/${threadId}/messages/${messageId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name DeleteMessage
     * @summary Deletes a message.
     * @request DELETE:/threads/{thread_id}/messages/{message_id}
     * @secure
     */
    deleteMessage: (threadId: string, messageId: string, params: RequestParams = {}) =>
      this.request<DeleteMessageResponse, any>({
        path: `/threads/${threadId}/messages/${messageId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name ListRuns
     * @summary Returns a list of runs belonging to a thread.
     * @request GET:/threads/{thread_id}/runs
     * @secure
     */
    listRuns: (
      threadId: string,
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         * @default "desc"
         */
        order?: "asc" | "desc";
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /** A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
        before?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListRunsResponse, any>({
        path: `/threads/${threadId}/runs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name CreateRun
     * @summary Create a run.
     * @request POST:/threads/{thread_id}/runs
     * @secure
     */
    createRun: (
      threadId: string,
      data: CreateRunRequest,
      query?: {
        /**
         * A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.
         *
         * See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.
         */
        "include[]"?: "step_details.tool_calls[*].file_search.results[*].content"[];
      },
      params: RequestParams = {},
    ) =>
      this.request<RunObject, any>({
        path: `/threads/${threadId}/runs`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name GetRun
     * @summary Retrieves a run.
     * @request GET:/threads/{thread_id}/runs/{run_id}
     * @secure
     */
    getRun: (threadId: string, runId: string, params: RequestParams = {}) =>
      this.request<RunObject, any>({
        path: `/threads/${threadId}/runs/${runId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name ModifyRun
     * @summary Modifies a run.
     * @request POST:/threads/{thread_id}/runs/{run_id}
     * @secure
     */
    modifyRun: (threadId: string, runId: string, data: ModifyRunRequest, params: RequestParams = {}) =>
      this.request<RunObject, any>({
        path: `/threads/${threadId}/runs/${runId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name CancelRun
     * @summary Cancels a run that is `in_progress`.
     * @request POST:/threads/{thread_id}/runs/{run_id}/cancel
     * @secure
     */
    cancelRun: (threadId: string, runId: string, params: RequestParams = {}) =>
      this.request<RunObject, any>({
        path: `/threads/${threadId}/runs/${runId}/cancel`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name ListRunSteps
     * @summary Returns a list of run steps belonging to a run.
     * @request GET:/threads/{thread_id}/runs/{run_id}/steps
     * @secure
     */
    listRunSteps: (
      threadId: string,
      runId: string,
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         * @default "desc"
         */
        order?: "asc" | "desc";
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /** A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
        before?: string;
        /**
         * A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.
         *
         * See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.
         */
        "include[]"?: "step_details.tool_calls[*].file_search.results[*].content"[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ListRunStepsResponse, any>({
        path: `/threads/${threadId}/runs/${runId}/steps`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name GetRunStep
     * @summary Retrieves a run step.
     * @request GET:/threads/{thread_id}/runs/{run_id}/steps/{step_id}
     * @secure
     */
    getRunStep: (
      threadId: string,
      runId: string,
      stepId: string,
      query?: {
        /**
         * A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.
         *
         * See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.
         */
        "include[]"?: "step_details.tool_calls[*].file_search.results[*].content"[];
      },
      params: RequestParams = {},
    ) =>
      this.request<RunStepObject, any>({
        path: `/threads/${threadId}/runs/${runId}/steps/${stepId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Assistants
     * @name SubmitToolOuputsToRun
     * @summary When a run has the `status: "requires_action"` and `required_action.type` is `submit_tool_outputs`, this endpoint can be used to submit the outputs from the tool calls once they're all completed. All outputs must be submitted in a single request.
     * @request POST:/threads/{thread_id}/runs/{run_id}/submit_tool_outputs
     * @secure
     */
    submitToolOuputsToRun: (
      threadId: string,
      runId: string,
      data: SubmitToolOutputsRunRequest,
      params: RequestParams = {},
    ) =>
      this.request<RunObject, any>({
        path: `/threads/${threadId}/runs/${runId}/submit_tool_outputs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  uploads = {
    /**
 * No description
 *
 * @tags Uploads
 * @name CreateUpload
 * @summary Creates an intermediate [Upload](/docs/api-reference/uploads/object) object
that you can add [Parts](/docs/api-reference/uploads/part-object) to.
Currently, an Upload can accept at most 8 GB in total and expires after an
hour after you create it.

Once you complete the Upload, we will create a
[File](/docs/api-reference/files/object) object that contains all the parts
you uploaded. This File is usable in the rest of our platform as a regular
File object.

For certain `purpose` values, the correct `mime_type` must be specified. 
Please refer to documentation for the 
[supported MIME types for your use case](/docs/assistants/tools/file-search#supported-files).

For guidance on the proper filename extensions for each purpose, please
follow the documentation on [creating a
File](/docs/api-reference/files/create).
 * @request POST:/uploads
 * @secure
 */
    createUpload: (data: CreateUploadRequest, params: RequestParams = {}) =>
      this.request<Upload, any>({
        path: `/uploads`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Uploads
     * @name CancelUpload
     * @summary Cancels the Upload. No Parts may be added after an Upload is cancelled.
     * @request POST:/uploads/{upload_id}/cancel
     * @secure
     */
    cancelUpload: (uploadId: string, params: RequestParams = {}) =>
      this.request<Upload, any>({
        path: `/uploads/${uploadId}/cancel`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Uploads
 * @name CompleteUpload
 * @summary Completes the [Upload](/docs/api-reference/uploads/object). 

Within the returned Upload object, there is a nested [File](/docs/api-reference/files/object) object that is ready to use in the rest of the platform.

You can specify the order of the Parts by passing in an ordered list of the Part IDs.

The number of bytes uploaded upon completion must match the number of bytes initially specified when creating the Upload object. No Parts may be added after an Upload is completed.
 * @request POST:/uploads/{upload_id}/complete
 * @secure
 */
    completeUpload: (uploadId: string, data: CompleteUploadRequest, params: RequestParams = {}) =>
      this.request<Upload, any>({
        path: `/uploads/${uploadId}/complete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Uploads
 * @name AddUploadPart
 * @summary Adds a [Part](/docs/api-reference/uploads/part-object) to an [Upload](/docs/api-reference/uploads/object) object. A Part represents a chunk of bytes from the file you are trying to upload. 

Each Part can be at most 64 MB, and you can add Parts until you hit the Upload maximum of 8 GB.

It is possible to add multiple Parts in parallel. You can decide the intended order of the Parts when you [complete the Upload](/docs/api-reference/uploads/complete).
 * @request POST:/uploads/{upload_id}/parts
 * @secure
 */
    addUploadPart: (uploadId: string, data: AddUploadPartRequest, params: RequestParams = {}) =>
      this.request<UploadPart, any>({
        path: `/uploads/${uploadId}/parts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  vectorStores = {
    /**
     * No description
     *
     * @tags Vector stores
     * @name ListVectorStores
     * @summary Returns a list of vector stores.
     * @request GET:/vector_stores
     * @secure
     */
    listVectorStores: (
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         * @default "desc"
         */
        order?: "asc" | "desc";
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /** A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
        before?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListVectorStoresResponse, any>({
        path: `/vector_stores`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name CreateVectorStore
     * @summary Create a vector store.
     * @request POST:/vector_stores
     * @secure
     */
    createVectorStore: (data: CreateVectorStoreRequest, params: RequestParams = {}) =>
      this.request<VectorStoreObject, any>({
        path: `/vector_stores`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name GetVectorStore
     * @summary Retrieves a vector store.
     * @request GET:/vector_stores/{vector_store_id}
     * @secure
     */
    getVectorStore: (vectorStoreId: string, params: RequestParams = {}) =>
      this.request<VectorStoreObject, any>({
        path: `/vector_stores/${vectorStoreId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name ModifyVectorStore
     * @summary Modifies a vector store.
     * @request POST:/vector_stores/{vector_store_id}
     * @secure
     */
    modifyVectorStore: (vectorStoreId: string, data: UpdateVectorStoreRequest, params: RequestParams = {}) =>
      this.request<VectorStoreObject, any>({
        path: `/vector_stores/${vectorStoreId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name DeleteVectorStore
     * @summary Delete a vector store.
     * @request DELETE:/vector_stores/{vector_store_id}
     * @secure
     */
    deleteVectorStore: (vectorStoreId: string, params: RequestParams = {}) =>
      this.request<DeleteVectorStoreResponse, any>({
        path: `/vector_stores/${vectorStoreId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name CreateVectorStoreFileBatch
     * @summary Create a vector store file batch.
     * @request POST:/vector_stores/{vector_store_id}/file_batches
     * @secure
     */
    createVectorStoreFileBatch: (
      vectorStoreId: string,
      data: CreateVectorStoreFileBatchRequest,
      params: RequestParams = {},
    ) =>
      this.request<VectorStoreFileBatchObject, any>({
        path: `/vector_stores/${vectorStoreId}/file_batches`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name GetVectorStoreFileBatch
     * @summary Retrieves a vector store file batch.
     * @request GET:/vector_stores/{vector_store_id}/file_batches/{batch_id}
     * @secure
     */
    getVectorStoreFileBatch: (vectorStoreId: string, batchId: string, params: RequestParams = {}) =>
      this.request<VectorStoreFileBatchObject, any>({
        path: `/vector_stores/${vectorStoreId}/file_batches/${batchId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name CancelVectorStoreFileBatch
     * @summary Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible.
     * @request POST:/vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel
     * @secure
     */
    cancelVectorStoreFileBatch: (vectorStoreId: string, batchId: string, params: RequestParams = {}) =>
      this.request<VectorStoreFileBatchObject, any>({
        path: `/vector_stores/${vectorStoreId}/file_batches/${batchId}/cancel`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name ListFilesInVectorStoreBatch
     * @summary Returns a list of vector store files in a batch.
     * @request GET:/vector_stores/{vector_store_id}/file_batches/{batch_id}/files
     * @secure
     */
    listFilesInVectorStoreBatch: (
      vectorStoreId: string,
      batchId: string,
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         * @default "desc"
         */
        order?: "asc" | "desc";
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /** A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
        before?: string;
        /** Filter by file status. One of `in_progress`, `completed`, `failed`, `cancelled`. */
        filter?: "in_progress" | "completed" | "failed" | "cancelled";
      },
      params: RequestParams = {},
    ) =>
      this.request<ListVectorStoreFilesResponse, any>({
        path: `/vector_stores/${vectorStoreId}/file_batches/${batchId}/files`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name ListVectorStoreFiles
     * @summary Returns a list of vector store files.
     * @request GET:/vector_stores/{vector_store_id}/files
     * @secure
     */
    listVectorStoreFiles: (
      vectorStoreId: string,
      query?: {
        /**
         * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
         * @default 20
         */
        limit?: number;
        /**
         * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.
         * @default "desc"
         */
        order?: "asc" | "desc";
        /** A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
        after?: string;
        /** A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
        before?: string;
        /** Filter by file status. One of `in_progress`, `completed`, `failed`, `cancelled`. */
        filter?: "in_progress" | "completed" | "failed" | "cancelled";
      },
      params: RequestParams = {},
    ) =>
      this.request<ListVectorStoreFilesResponse, any>({
        path: `/vector_stores/${vectorStoreId}/files`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name CreateVectorStoreFile
     * @summary Create a vector store file by attaching a [File](/docs/api-reference/files) to a [vector store](/docs/api-reference/vector-stores/object).
     * @request POST:/vector_stores/{vector_store_id}/files
     * @secure
     */
    createVectorStoreFile: (vectorStoreId: string, data: CreateVectorStoreFileRequest, params: RequestParams = {}) =>
      this.request<VectorStoreFileObject, any>({
        path: `/vector_stores/${vectorStoreId}/files`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name GetVectorStoreFile
     * @summary Retrieves a vector store file.
     * @request GET:/vector_stores/{vector_store_id}/files/{file_id}
     * @secure
     */
    getVectorStoreFile: (vectorStoreId: string, fileId: string, params: RequestParams = {}) =>
      this.request<VectorStoreFileObject, any>({
        path: `/vector_stores/${vectorStoreId}/files/${fileId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name DeleteVectorStoreFile
     * @summary Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted. To delete the file, use the [delete file](/docs/api-reference/files/delete) endpoint.
     * @request DELETE:/vector_stores/{vector_store_id}/files/{file_id}
     * @secure
     */
    deleteVectorStoreFile: (vectorStoreId: string, fileId: string, params: RequestParams = {}) =>
      this.request<DeleteVectorStoreFileResponse, any>({
        path: `/vector_stores/${vectorStoreId}/files/${fileId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name UpdateVectorStoreFileAttributes
     * @summary Update attributes on a vector store file.
     * @request POST:/vector_stores/{vector_store_id}/files/{file_id}
     * @secure
     */
    updateVectorStoreFileAttributes: (
      vectorStoreId: string,
      fileId: string,
      data: UpdateVectorStoreFileAttributesRequest,
      params: RequestParams = {},
    ) =>
      this.request<VectorStoreFileObject, any>({
        path: `/vector_stores/${vectorStoreId}/files/${fileId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name RetrieveVectorStoreFileContent
     * @summary Retrieve the parsed contents of a vector store file.
     * @request GET:/vector_stores/{vector_store_id}/files/{file_id}/content
     * @secure
     */
    retrieveVectorStoreFileContent: (vectorStoreId: string, fileId: string, params: RequestParams = {}) =>
      this.request<VectorStoreFileContentResponse, any>({
        path: `/vector_stores/${vectorStoreId}/files/${fileId}/content`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Vector stores
     * @name SearchVectorStore
     * @summary Search a vector store for relevant chunks based on a query and file attributes filter.
     * @request POST:/vector_stores/{vector_store_id}/search
     * @secure
     */
    searchVectorStore: (vectorStoreId: string, data: VectorStoreSearchRequest, params: RequestParams = {}) =>
      this.request<VectorStoreSearchResultsPage, any>({
        path: `/vector_stores/${vectorStoreId}/search`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
