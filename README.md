# SAMMI Companion (Extension)

Hi!
Welcome to the source code and docs of the _SAMMI Companion Extension_. This extension is the way we make _SAMMI Companion_ work with SAMMI.

An extension for _SAMMI_ that connects to [_SAMMI Companion_](https://github.com/spacedock-zero/SAMMI-Companion_pre/releases) to provide additional features and functionality.

All the features are not contained directly in this extension, but rather in the _SAMMI Companion_ application, which needs to be installed and running on your computer. This extension connects to it and uses its features to provide additional functionality to SAMMI.

> This project is not associated with or endorsed by [SAMMI](https://sammi.solutions/)

## Features
### **TTS Engine**
A text-to-speech engine that can be used to read out text sent by SAMMI to Companion with Extension Commands.

- **Commands**:
  - **Companion: TTS Request**: Adds a request to the TTS queue.
  - **Companion: TTS Request (Consistent)**: Special version of the above that allows allowing to persist a voice for a given user, so that the same voice is used for all TTS requests from that user.
  - **Companion: TTS Queue Pause**: Stops the TTS queue from being processed.
  - **Companion: TTS Queue Resume**: Resumes the TTS queue processing.
  - **Companion: TTS Skip**: Stops the playing TTS message, if the queue is not paused it starts the next one.
  - **Companion: TTS Volume**: Sets the volume of the TTS engine.
  - **Companion: TTS Rate**: Sets the audio speed of the TTS engine.

### **Input Triggers**
Extension triggers that allow Keyboard or Mouse input to trigger actions in SAMMI.
- **Extension Triggers**:
  - **companion-keypress**: Triggers an action when a key is pressed, pull data contains the key name.
  - **companion-keyrelease**: Triggers an action when a key is released, pull data contains the key name.
  - **companion-mousepress**: Triggers an action when a mouse button is clicked, pull data contains the button name.
  - **companion-mouserelease**: Triggers an action when a mouse button is released, pull data contains the button name.
  - **companion-mousemove**: Triggers an action when the mouse is moved, pull data contains the mouse position.
  - **companion-mousescroll**: Triggers an action when the mouse wheel is scrolled, pull data contains the scroll direction and amount.

## Experimental Features

### **Song Recognition**
Uses the Companion song fingerprinting engine to detect currently playing music from a device and set according variables within SAMMI.
- **Variables**:
  - **companion-songreco.songreco_lyric**: Variable that contains the current lyric (line) of the detected song currently playing, synced with playback, Companion will try to keep it as close as possible.
  - **companion-songreco.songreco_lyrics**: Variable that contains the full lyrics of the detected song currently playing.
  - **companion-songreco.songreco_track**: Variable that contains the details of the detected song currently playing, including title, artist, album, and cover art.
- **Extension Triggers**:
  - **companion-songreco**: Triggers whenever an update to data is received, from all of the above.