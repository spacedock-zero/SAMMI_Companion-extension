# SAMMI Companion (Extension)

Hi!
Welcome to the source code and docs of the SAMMI Companion extension. This extension is the way we make SAMMI Companion work with SAMMI.

> This project is not associated with or endorsed by [SAMMI](https://sammi.solutions/)

# Features
- **TTS Engine**: A text-to-speech engine that can be used to read out text sent by SAMMI to Companion with Extension Commands.
  - **Companion: TTS Request**: Adds a request to the TTS queue.
  - **Companion: TTS Queue Pause**: Stops the TTS queue from being processed.
  - **Companion: TTS Queue Resume**: Resumes the TTS queue processing.
  - **Companion: TTS Skip**: Stops the playing TTS message, if the queue is not paused it starts the next one.
  - **Companion: TTS Volume**: Sets the volume of the TTS engine.
  - **Companion: TTS Rate**: Sets the audio speed of the TTS engine.

- **Input Triggers**: Allows Keyboard or Mouse input to trigger actions in SAMMI.
  - **companion-keypress**: Triggers an action when a key is pressed, pull data contains the key name.
  - **companion-keyrelease**: Triggers an action when a key is released, pull data contains the key name.
  - **companion-mousepress**: Triggers an action when a mouse button is clicked, pull data contains the button name.
  - **companion-mouserelease**: Triggers an action when a mouse button is released, pull data contains the button name.
  - **companion-mousemove**: Triggers an action when the mouse is moved, pull data contains the mouse position.
  - **companion-mousescroll**: Triggers an action when the mouse wheel is scrolled, pull data contains the scroll direction and amount.

# Experimental Features

- **Song Recognition**: Uses the Companion fingerprinting engine to set variables within SAMMI.
  - **companion-songreco.songreco_lyric**: Contains the current lyric (line) of the detected song currently playing, synced with playback, Companion will try to keep it as close as possible.
  - **companion-songreco.songreco_lyrics**: Contains the full lyrics of the detected song currently playing.
  - **companion-songreco.songreco_track**: Contains the details of the detected song currently playing, including title, artist, album, and cover art.