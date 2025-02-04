import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ICachedMemory } from 'src/user-auth/application/interfaces/cached-memory';

@Injectable()
export class RedisService implements OnModuleInit, ICachedMemory {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async onModuleInit() {
    try {
      const pong = await this.redis.ping();
      if (pong) console.log('Conexão com Redis estabelecida');
    } catch (error) {
      console.error('Erro ao conectar ao Redis:', error);
    }
  }

  async setValue(key: string, value: string) {
    try {
      await this.redis.set(key, value);
      console.log(`Valor ${value} salvo com a chave ${key}`);
    } catch (error) {
      console.error('Erro ao salvar valor no Redis:', error);
    }
  }

  async getValue(key: string) {
    try {
      const value = await this.redis.get(key);
      console.log(`Valor recuperado para a chave ${key}: ${value}`);
      return value;
    } catch (error) {
      console.error('Erro ao recuperar valor do Redis:', error);
    }
  }

  async closeConnection() {
    await this.redis.quit();
    console.log('Conexão com Redis fechada');
  }
}
