import type { GameType } from "../common";

export interface GameLog {
    date: string;
    duration: string;
    game: string;
    category: GameType;
  }
  
  export interface GameFormData {
    startTime: Date | null | undefined;
    endTime: Date | null | undefined;
    game: string;
    category: GameType;
    duration: string;
    date: Date;
    
  }
  