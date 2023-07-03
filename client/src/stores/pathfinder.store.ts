import { defineStore } from "pinia";
import { ref } from "vue";
import { useFetch } from "../composables/useFetch";
import { PathfinderErrors } from "../types/pathfinder/PathfinderErrors";
import { AstarError } from "../types/pathfinder/AstarError";
import { Trace } from "../types/pathfinder/Trace";
import { Location } from "../types/pathfinder/Location";

export const usePathfinderStore = defineStore('pathfinder', () => {
  const keys = ref<PathfinderErrors>();

  const loadKeys = async () => {
    const res = await useFetch('/pathfinder/errors');

    keys.value = res.data;
  }

  const getKey = async (key: string, namespace: string) => {
    const res = await useFetch(`pathfinder/${namespace}/${key}`);

    return res.data;
  }

  const formatTrace = (trace: Trace) => {
    return `${trace.declaringClass}.${trace.methodName}(${trace.fileName}${trace.lineNumber})`
  }

  const formatCommand = (error: AstarError) => {
    return `/gps-menu showA*Fail ${error.start.world},${error.start.x},${error.start.z},${error.start.y}|${error.end.world},${error.end.x},${error.end.z},${error.end.y}`
  }

  const formatLocation = (loc: Location) => {
    return `${loc.world} ${loc.x} ${loc.z} ${loc.y}`
  }

  return { keys, loadKeys, formatTrace, formatCommand, formatLocation, getKey }
})