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
  compressor: DynamicsCompressorNode;
  output: AudioNode;

  constructor() {
    this._ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.5;
    this.masterGain.connect(this.ctx.destination);

    // Use reasonably strong compression for UI feedback
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -24;
    this.compressor.knee.value = 10;
    this.compressor.release.value = 0.5;
    this.compressor.connect(this.masterGain);

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

  #playMelody(melody: Melody) {
    const defaultGain = 0.4;
    let melodyOffset = 0;
    let noteOverlap = 0;

    if (melody.meta.style === "staccato") {
      noteOverlap = 0;
    } else if (melody.meta.style === "legato") {
      noteOverlap = 0.75;
    }

    melody.notes.forEach((note) => {
      const noteDuration = durationToSeconds(melody.meta.bpm, note.duration);
      const startTime = this.ctx.currentTime + melodyOffset;
      const stopTime = startTime + noteDuration;

      // Set up nodes
      const oscNode = this.ctx.createOscillator();
      oscNode.frequency.value = note.pitch;

      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(
        note.gain !== undefined ? note.gain : defaultGain,
        startTime,
      );
      gainNode.gain.exponentialRampToValueAtTime(0.001, stopTime + noteOverlap);

      // Wire up nodes
      oscNode.connect(gainNode);
      gainNode.connect(this.output);

      // Play it
      oscNode.start(startTime);
      oscNode.stop(stopTime + noteOverlap);

      // Update time
      melodyOffset += noteDuration;
    });
  }

  reset() {
    const melody: Note[] = [
      { pitch: notes.get("E5")!, duration: "S" },
      { pitch: notes.get("B4")!, duration: "S" },
      { pitch: notes.get("E4")!, duration: "H" },
    ];

    this.#playMelody({
      notes: melody,
      meta: {
        bpm: 140,
        style: "legato",
      },
    });
  }

  winner() {
    const melody: Note[] = [
      { pitch: notes.get("B4")!, duration: "S" },
      { pitch: notes.get("E4")!, duration: "S" },
      { pitch: notes.get("E5")!, duration: "H" },
    ];

    this.#playMelody({
      notes: melody,
      meta: {
        bpm: 140,
        style: "legato",
      },
    });
  }
}

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
