describe('MongoDB connection URI', () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnvironment };
  });

  afterAll(() => {
    process.env = originalEnvironment;
  });

  test('converts an SRV URI to a seed-list URI when fallback settings exist', () => {
    process.env.MONGODB_URI =
      'mongodb+srv://cloud-user:p%40ss@cluster.example.net/cloudtask?retryWrites=true&w=majority';
    process.env.MONGODB_SEED_HOSTS = 'db-00.example.net:27017,db-01.example.net:27017';
    process.env.MONGODB_REPLICA_SET = 'atlas-example-shard-0';

    const { getConnectionUri } = require('../src/config/db');
    const connectionUri = getConnectionUri();

    expect(connectionUri).toContain(
      'mongodb://cloud-user:p%40ss@db-00.example.net:27017,db-01.example.net:27017/cloudtask?'
    );
    expect(connectionUri).toContain('retryWrites=true');
    expect(connectionUri).toContain('tls=true');
    expect(connectionUri).toContain('replicaSet=atlas-example-shard-0');
    expect(connectionUri).toContain('authSource=admin');
  });

  test('keeps the configured URI when fallback settings are absent', () => {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/cloudtask';
    delete process.env.MONGODB_SEED_HOSTS;
    delete process.env.MONGODB_REPLICA_SET;

    const { getConnectionUri } = require('../src/config/db');

    expect(getConnectionUri()).toBe(process.env.MONGODB_URI);
  });
});
