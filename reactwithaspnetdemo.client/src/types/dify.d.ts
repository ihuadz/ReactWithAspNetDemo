interface Window {
  difyChatbotConfig?: {
    token: string;
    baseUrl: string;
    inputs?: Record<string, any>;
    systemVariables?: {
      user_id?: string;
      conversation_id?: string;
    };
    userVariables?: {
      avatar_url?: string;
      name?: string;
    };
  };
}
