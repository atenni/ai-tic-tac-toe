type MelodyStyle = "legato" | "staccato";

type NoteDuration = "W" | "H" | "Q" | "E" | "S";

interface Note {
  pitch: number;
  duration: NoteDuration;
  gain?: number; // TODO: this should be named in a more musical manner
  // dotted?: boolean;
}

interface Melody {
  meta: {
    // timeSignature: "4/4" | "3/4";
    bpm: number;
    style: MelodyStyle;
  };
  notes: Note[];
}

class Sounds {
  _ctx: AudioContext;
  masterGain: GainNode;

  constructor() {
    this._ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.15, 0);
    this.masterGain.connect(this.ctx.destination);
    // Use a common connection point for all sounds before we route to output
    this.output = this.compressor;
  }

  get ctx(): AudioContext {
    if (this._ctx.state === "suspended") {
      this._ctx.resume();
    }
    return this._ctx;
  }

  click(type?: "heavy") {
    // Config (default light click)
    let freqLow = notes.get("E3")!;
    let freqHigh = notes.get("B7")!;
    let volLow = 0.08;
    let volHigh = 0.1;
    let duration = 0.01;

    if (type == "heavy") {
      freqLow = notes.get("E3")!;
      freqHigh = notes.get("B7")!;
      volLow = 1;
      volHigh = 0.05;
      duration = 0.01;
    }

    // Set it up
    const clickOscillatorLow = this.ctx.createOscillator();
    clickOscillatorLow.frequency.setValueAtTime(
      freqLow,
      this.ctx.currentTime,
    );

    const clickOscillatorHigh = this.ctx.createOscillator();
    clickOscillatorHigh.frequency.setValueAtTime(
      freqHigh,
      this.ctx.currentTime,
    );

    const clickGainLow = this.ctx.createGain();
    clickGainLow.gain.setValueAtTime(volLow, this.ctx.currentTime);
    clickGainLow.gain.exponentialRampToValueAtTime(
      0.001,
      this.ctx.currentTime + duration,
    );

    const clickGainHigh = this.ctx.createGain();
    clickGainHigh.gain.setValueAtTime(volHigh, this.ctx.currentTime);
    clickGainHigh.gain.exponentialRampToValueAtTime(
      0.001,
      this.ctx.currentTime + duration,
    );

    // Wire it up
    clickOscillatorLow.connect(clickGainLow);
    clickOscillatorHigh.connect(clickGainHigh);
    clickGainLow.connect(this.output);
    clickGainHigh.connect(this.output);

    // Play it
    clickOscillatorLow.start();
    clickOscillatorHigh.start();
    clickOscillatorLow.stop(this.ctx.currentTime + duration);
    clickOscillatorHigh.stop(this.ctx.currentTime + duration);
  }

  #threeNotes(note1Freq: number, note2Freq: number, note3Freq: number) {
    // Config
    const noteDuration = 0.075;
    const lastNoteHold = noteDuration * 3;
    const spaceDuration = 0.025;
    const melodyGainLevel = 0.4;
    const totalDuration = noteDuration * 2 + spaceDuration * 2 + lastNoteHold;

    // Set it up
    const note1Osc = this.ctx.createOscillator();
    note1Osc.frequency.setValueAtTime(note1Freq, this.ctx.currentTime);
    const note2Osc = this.ctx.createOscillator();
    note2Osc.frequency.setValueAtTime(note2Freq, this.ctx.currentTime);
    const note3Osc = this.ctx.createOscillator();
    note3Osc.frequency.setValueAtTime(note3Freq, this.ctx.currentTime);

    const melodyGain = this.ctx.createGain();
    melodyGain.gain.setValueAtTime(melodyGainLevel, this.ctx.currentTime);
    melodyGain.gain.exponentialRampToValueAtTime(
      melodyGainLevel * 0.1,
      this.ctx.currentTime + totalDuration,
    );

    // Wire it up
    note1Osc.connect(melodyGain);
    note2Osc.connect(melodyGain);
    note3Osc.connect(melodyGain);
    melodyGain.connect(this.masterGain);

    // Play it
    note1Osc.start(this.ctx.currentTime);
    note1Osc.stop(this.ctx.currentTime + noteDuration);

    note2Osc.start(this.ctx.currentTime + noteDuration + spaceDuration);
    note2Osc.stop(
      this.ctx.currentTime + noteDuration + spaceDuration + noteDuration,
    );

    note3Osc.start(
      this.ctx.currentTime + noteDuration + spaceDuration + noteDuration +
        spaceDuration,
    );
    note3Osc.stop(
      this.ctx.currentTime + totalDuration,
    );
  }

  reset() {
    const note1Freq = 659.25; // E5
    const note2Freq = 493.88; // B4
    const note3Freq = 329.63; // E4

    this.#threeNotes(note1Freq, note2Freq, note3Freq);
  }

  winner() {
const notes = new Map<string, number>([
  ["E3", 164.81],
  ["B4", 493.88],
  ["E4", 329.63],
  ["E5", 659.25],
  ["B7", 3951.07],
]);

function durationToSeconds(bpm: number, duration: NoteDuration): number {
  const secondsPerBeat = 60 / bpm;
  const secondsPerBar = secondsPerBeat * 4; // Assumes 4/4 time

  switch (duration) {
    case "W":
      return secondsPerBar / 1;
    case "H":
      return secondsPerBar / 2;
    case "Q":
      return secondsPerBar / 4;
    case "E":
      return secondsPerBar / 8;
    case "S":
      return secondsPerBar / 16;
  }
}

export default new Sounds();
