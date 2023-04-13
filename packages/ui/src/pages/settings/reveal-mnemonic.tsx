import { createSignal, Match, Switch, type Component } from 'solid-js';
import { AuthStep } from './index';
import { store } from '../../store';
import { Link } from '../../components/link';
import { Copy } from '../../components/copy';
import { ChevronLeftIcon } from '../../components/icons/chevron-left';
import { EyeIcon } from '../../components/icons/eye';
import { EyeSlashIcon } from '../../components/icons/eye-slash';

export const RevealMnemonic: Component = () => {
  const [currentStep, setCurrentStep] = createSignal<'authenticate' | 'reveal'>('authenticate');
  return (
    <div class="flex flex-col w-[360px] h-[540px] p-4 space-y-2 text-white bg-black border-[0.3px] border-zinc-700">
      <Link path="/settings" class="flex items-center space-x-1 mb-4">
        <ChevronLeftIcon />
        <span class="text-sm">Settings / Reveal recovery phrase</span>
      </Link>
      <Switch>
        <Match when={currentStep() === 'authenticate'}>
          <AuthStep onNext={() => setCurrentStep(() => 'reveal')} />
        </Match>
        <Match when={currentStep() === 'reveal'}>
          <RevealStep />
        </Match>
      </Switch>
    </div>
  );
};

const RevealStep: Component = () => {
  const [blurredOut, setBlurredOut] = createSignal(true);
  return (
    <div class="relative h-full space-y-4">
      <div class="flex items-center justify-between">
        <div class="uppercase">Recovery phrase</div>
        {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
        <Copy value={store.mnemonic!} />
      </div>
      <div class="flex items-center justify-around p-2 border-[0.3px] border-zinc-700/80 rounded">
        <p
          classList={{
            'w-[92%] text-sm select-none break-words line-clamp-3': true,
            blur: blurredOut(),
          }}
        >
          {store.mnemonic}
        </p>
        <button type="button" onClick={() => setBlurredOut((prev) => !prev)}>
          {blurredOut() ? <EyeIcon /> : <EyeSlashIcon />}
        </button>
      </div>
      <p class="text-sm text-zinc-400">
        <span class="font-bold">Never share it to anyone!</span> Your recovery phrase give you full
        control on your wallet. If you lose your recovery phrase, you will lose access to your funds
        and assets.
      </p>
      <Link
        path="/"
        class="absolute w-full py-2 bottom-0 text-center border-[0.3px] border-zinc-700/80 cursor-pointer hover:bg-zinc-700/20 rounded"
      >
        Close
      </Link>
    </div>
  );
};
