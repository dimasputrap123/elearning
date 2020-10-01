import OT from "@opentok/client";
export default function createSession({
  apiKey,
  sessionId,
  token,
  onStreamsUpdated,
  onSignalUpdated,
  onConnectionUpdated,
  onConnect,
  onError,
  options,
} = {}) {
  if (!apiKey) {
    throw new Error("Missing apiKey");
  }

  if (!sessionId) {
    throw new Error("Missing sessionId");
  }

  if (!token) {
    throw new Error("Missing token");
  }

  let streams = [];
  let connections = [];
  let session = OT.initSession(apiKey, sessionId, options);

  let onStreamCreated = (event) => {
    const index = streams.findIndex((stream) => stream.id === event.stream.id);
    if (index < 0) {
      streams.push(event.stream);
      onStreamsUpdated(streams);
    }
  };

  let onStreamDestroyed = (event) => {
    const index = streams.findIndex((stream) => stream.id === event.stream.id);
    if (index >= 0) {
      streams.splice(index, 1);
      onStreamsUpdated(streams);
    }
  };

  let onSignal = (event) => {
    console.log("on signal trigger");
    if (event.from.connectionId !== session.connection.id)
      onSignalUpdated(event);
  };

  let onConnectionCreated = (event) => {
    const index = connections.findIndex(
      (e) => e.connection.id === event.connection.id
    );
    if (index < 0 && event.connection.id !== session.connection.id) {
      connections = [...connections, event];
      onConnectionUpdated(connections);
    }
    // console.log("con created", event.connection);
  };

  let onConnectionDestroyed = (event) => {
    const index = connections.findIndex(
      (e) => e.connection.id === event.connection.id
    );
    if (index >= 0) {
      connections = connections.filter(
        (e) => e.connection.id !== event.connection.id
      );
      onConnectionUpdated(connections);
    }
    // console.log("con destroyed", event.connection);
  };

  let eventHandlers = {
    streamCreated: onStreamCreated,
    streamDestroyed: onStreamDestroyed,
    signal: onSignal,
    connectionCreated: onConnectionCreated,
    connectionDestroyed: onConnectionDestroyed,
  };

  session.on(eventHandlers);
  session.connect(token, (err) => {
    if (!session) {
      // Either this session has been disconnected or OTSession
      // has been unmounted so don't invoke any callbacks
      return;
    }
    if (err && typeof onError === "function") {
      onError(err);
    } else if (!err && typeof onConnect === "function") {
      onConnect();
    }
  });

  return {
    session,
    streams,
    disconnect() {
      if (session) {
        session.off(eventHandlers);
        session.disconnect();
      }

      streams = null;
      onStreamCreated = null;
      onStreamDestroyed = null;
      onSignal = null;
      onConnectionCreated = null;
      onConnectionDestroyed = null;
      eventHandlers = null;
      session = null;

      this.session = null;
      this.streams = null;
    },
  };
}
