import { io } from "socket.io-client";
import { LogsQuery } from "../types/LogsQuery";
import { getCurrentInstance, onUnmounted, ref } from "vue";
import { Logs } from "../types/Logs";
import { useToasts } from "./useToasts";
import { WebsocketMessages } from "../enums/WebsocketMessages";
import { Errors } from "../enums/Errors";
import { intranet_api_uri } from "../constants";

export const useLogs = (config: LogsQuery) => {
	const socket = io(intranet_api_uri, {
		path: '/instances/logs'
	});
	const logs = ref<Logs>();

	const { toastError } = useToasts();

	const loadLogs = () => {
		socket.emit(WebsocketMessages.LISTEN_TO_LOGS, config);

		socket.on(WebsocketMessages.UPDATE_LOGS, (cb: Logs) => {
			logs.value = cb;
		});

		socket.on(WebsocketMessages.CONNECT_ERROR, () => toastError(Errors.ERR_SERVER));
		socket.on(WebsocketMessages.EXCEPTION, () => toastError(Errors.CANT_GET_LOGS));

		if (getCurrentInstance()) {
			onUnmounted(() => {
				socket.emit('stopListeningToLogs')
			})
		}
	};

	return { loadLogs, logs };
};
