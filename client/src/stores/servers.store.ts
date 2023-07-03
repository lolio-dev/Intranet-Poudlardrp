import { io } from "socket.io-client";
import { getCurrentInstance, onUnmounted, ref } from "vue";
import { Server } from "../types/Server";
import { defineStore } from "pinia";
import { useFetch } from "../composables/useFetch";
import { intranet_api_uri } from "../constants";

export const useServersStore = defineStore('servers', () => {
  const socket = io(intranet_api_uri, {
    path: "/serversws"
  });
  const servers = ref<Map<string, Server>>();
  const selectedServer = ref<Server>();
  const selectedServerId = ref<string>();

  const sendMessageToSelectedServer = async (message: string) => {
    if (selectedServer.value) {
      await useFetch(
          `/servers/${selectedServerId.value}/sendMessage`,
          'POST',
          {
            data: {
              message: message,
              type: 'TCHAT'
            }
          }
      )
    }
  }

  const setSelectedServerId = (serverId: string) => {
    selectedServerId.value = serverId;
  }

  const setSelectedServer = (server: Server) => {
    selectedServer.value = server
  }

  const loadServers = () => {
    socket.emit('getAllServers', (cb: Record<string, Server>) => {
      servers.value = new Map(Object.entries(cb));
    });

    socket.on('updateServers', (cb: [string, Server]) => {
      if (servers.value) {
        cb[1].state.customData = JSON.parse(<string>cb[1].state.customData)
        servers.value.set(cb[0], {
          ...cb[1],
          chat: cb[1].chat.reverse(),
        });
      }

      if (selectedServerId.value && cb[0] === selectedServerId.value) setSelectedServer(cb[1])
    });

    socket.on('removeServer', (serverName: string) => {
      if (serverName) {
        servers.value?.delete(serverName);
      }
    })

    if (getCurrentInstance()) {
      onUnmounted(() => {
        socket.off('updateServers')
      })
    }
  };

  return { loadServers, servers, selectedServer, setSelectedServerId, sendMessageToSelectedServer };
});
