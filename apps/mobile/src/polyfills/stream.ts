/* eslint-disable @typescript-eslint/no-unsafe-call */
// @ts-expect-error - polyfillGlobal is not typed
import { polyfillGlobal } from "react-native/Libraries/Utilities/PolyfillFunctions";
import {
  TransformStream,
  WritableStream,
} from "web-streams-polyfill/ponyfill/es6";

export class TextDecoderStream extends TransformStream<Uint8Array, string> {
  readonly encoding: string;
  readonly fatal: boolean;
  readonly ignoreBOM: boolean;

  constructor(
    encoding = "utf-8",
    {
      fatal = false,
      ignoreBOM = false,
    }: ConstructorParameters<typeof TextDecoder>[1] = {},
  ) {
    const decoder = new TextDecoder(encoding, { fatal, ignoreBOM });
    super({
      transform(
        chunk: Uint8Array,
        controller: TransformStreamDefaultController<string>,
      ) {
        const decoded = decoder.decode(chunk, { stream: true });
        if (decoded.length > 0) {
          controller.enqueue(decoded);
        }
      },
      flush(controller: TransformStreamDefaultController<string>) {
        // If {fatal: false} is in options (the default), then the final call to
        // decode() can produce extra output (usually the unicode replacement
        // character 0xFFFD). When fatal is true, this call is just used for its
        // side-effect of throwing a TypeError exception if the input is
        // incomplete.
        const output = decoder.decode();
        if (output.length > 0) {
          controller.enqueue(output);
        }
      },
    });

    this.encoding = encoding;
    this.fatal = fatal;
    this.ignoreBOM = ignoreBOM;
  }
}

polyfillGlobal("WritableStream", () => WritableStream);
polyfillGlobal("TransformStream", () => TransformStream);
polyfillGlobal("TextDecoderStream", () => TextDecoderStream);
