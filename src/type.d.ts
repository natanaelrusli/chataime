export type OllamaResponse = {
  model: string;
  created_at: string; // or Date if you want to parse it
  message: Message;
  done: boolean;
  done_reason: string;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
};

export type Message = {
  role: string;
  content: string;
};
