/**
 * Game timer for FreeCell
 * Starts on first move, pauses on tab blur, resumes on focus
 */

export class GameTimer {
  private startTime: number = 0;
  private elapsed: number = 0;
  private running: boolean = false;
  private pausedAt: number = 0;

  start(): void {
    if (this.running) return;
    this.running = true;
    this.startTime = Date.now() - this.elapsed;
  }

  pause(): void {
    if (!this.running) return;
    this.elapsed = Date.now() - this.startTime;
    this.running = false;
  }

  stop(): void {
    this.pause();
  }

  reset(): void {
    this.startTime = 0;
    this.elapsed = 0;
    this.running = false;
  }

  get seconds(): number {
    if (this.running) {
      return Math.floor((Date.now() - this.startTime) / 1000);
    }
    return Math.floor(this.elapsed / 1000);
  }

  get isRunning(): boolean {
    return this.running;
  }

  get formattedTime(): string {
    const total = this.seconds;
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  /**
   * Serialize for LocalStorage persistence
   */
  toJSON(): { elapsed: number; running: boolean } {
    return {
      elapsed: this.running ? Date.now() - this.startTime : this.elapsed,
      running: this.running,
    };
  }

  /**
   * Restore from LocalStorage
   */
  static fromJSON(data: { elapsed: number; running: boolean }): GameTimer {
    const timer = new GameTimer();
    timer.elapsed = data.elapsed;
    if (data.running) {
      timer.running = true;
      timer.startTime = Date.now() - timer.elapsed;
    }
    return timer;
  }
}
