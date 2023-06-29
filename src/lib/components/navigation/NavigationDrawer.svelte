<script lang="ts">
  import HomeSvg from "$lib/components/svgs/HomeSvg.svelte";
  import { userStore } from "$lib/store";
  import LogInSvg from "$lib/components/svgs/LogInSvg.svelte";
  import LogOutSvg from "$lib/components/svgs/LogInSvg.svelte";
  import DrawerLink from "$lib/components/drawer/DrawerLink.svelte";
  import DrawerLinkGroup from "$lib/components/drawer/DrawerLinkGroup.svelte";
</script>

<nav
  id="navigation-drawer"
  class="list-nav h-full p-4 flex flex-col justify-between"
>
  <DrawerLinkGroup>
    <DrawerLink href="/">
      <HomeSvg />
      <h4 class="h4">LePtitCoin</h4>
    </DrawerLink>
  </DrawerLinkGroup>
  <DrawerLinkGroup>
    <hr />
    {#if $userStore}
      <DrawerLink href="/auth/signout">
        <LogOutSvg />
        <h4 class="h4">Sign Out</h4>
      </DrawerLink>
    {:else}
      <DrawerLink href="/auth/signin">
        <LogInSvg />
        <h4 class="h4">Sign In</h4>
      </DrawerLink>
    {/if}
  </DrawerLinkGroup>
</nav>
