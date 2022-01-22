import {InjectionKey} from "vue";
import {Store} from "vuex";
import {IState} from "@/types";

export const storeKey: InjectionKey<Store<IState>> = Symbol();