<script lang="ts">
  import { invalidate } from "$app/navigation";
  import NavigationBar from "$lib/components/navigation/NavigationBar.svelte";
  import NavigationDrawer from "$lib/components/navigation/NavigationDrawer.svelte";
  import UserDrawer from "$lib/components/navigation/UserDrawer.svelte";
  import { userStore } from "$lib/store";
  import {
    AppShell,
    Drawer,
    Modal,
    Toast,
    drawerStore,
  } from "@skeletonlabs/skeleton";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "@skeletonlabs/skeleton/themes/theme-modern.css";
  import { onMount } from "svelte";
  import "../app.postcss";
  import "../dark-theme.postcss";

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  $: {
    userStore.set(session ? session.user : null);
  }

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange(
      (event: any, _session: any) => {
        if (_session?.expires_at !== session?.expires_at) {
          invalidate("supabase:auth");
        }
        userStore.set(_session ? _session.user : null);
      }
    );

    return () => data.subscription.unsubscribe();
  });
</script>

<Toast position="tr" />
<Modal />

<Drawer>
  {#if $drawerStore.id === "user"}
    <UserDrawer />
  {:else}
    <NavigationDrawer />
  {/if}
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-80 lg:w-1/4 bg-surface-500/10">
  <svelte:fragment slot="header">
    <NavigationBar />
  </svelte:fragment>
  <slot />
</AppShell>
