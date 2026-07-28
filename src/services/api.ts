import Constants from 'expo-constants';
import { Platform } from 'react-native';
import type { LeaderIndexResult } from '../types';

function resolveApiBase(): string {
  if (typeof process !== 'undefined' && process.env.EXPO_PUBLIC_API_BASE_URL !== undefined) {
    return String(process.env.EXPO_PUBLIC_API_BASE_URL).replace(/\/$/, '');
  }

  const extra = Constants.expoConfig?.extra as { apiBaseUrl?: string } | undefined;
  if (extra?.apiBaseUrl) return extra.apiBaseUrl.replace(/\/$/, '');

  if (Platform.OS === 'android') return 'http://10.0.2.2:3001';
  return 'http://localhost:3001';
}

export const API_BASE_URL = resolveApiBase();

async function request<T>(path: string, init?: RequestInit & { timeoutMs?: number }): Promise<T> {
  const timeoutMs = init?.timeoutMs ?? 90000;
  const { timeoutMs: _ignored, ...fetchInit } = init ?? {};
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...fetchInit,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(fetchInit.headers ?? {}),
      },
    });
    const json = (await res.json()) as T & { error?: string };
    if (!res.ok) {
      throw new Error(json.error ?? `Request failed (${res.status})`);
    }
    return json;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('분석 응답 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.');
    }
    if (err instanceof TypeError) {
      throw new Error('App Navi 서버에 연결할 수 없습니다. 프록시가 실행 중인지 확인해 주세요.');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchLeaderIndex(params: {
  lawdCd: string;
  topN?: number;
  years?: number;
  surgeThreshold?: number;
  areaTarget?: number;
}): Promise<LeaderIndexResult> {
  const search = new URLSearchParams({
    lawdCd: params.lawdCd,
    topN: String(params.topN ?? 10),
    years: String(params.years ?? 3),
    surgeThreshold: String(params.surgeThreshold ?? 3),
    areaTarget: String(params.areaTarget ?? 84),
  });
  return request(`/api/analysis/leader-index?${search.toString()}`, {
    timeoutMs: 120000,
  });
}
