-- PostgreSQL Initialization Script for Cheggie AI
-- This script creates the base schema for the application
-- Deploy to Railway PostgreSQL database

-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB DEFAULT '{}'
);

-- Admin sessions table for tracking login history
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  logout_at TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Trading signals table for AI Trader integration
CREATE TABLE IF NOT EXISTS trading_signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset VARCHAR(10) NOT NULL,
  action VARCHAR(20) NOT NULL, -- BUY, SELL, HOLD
  confidence DECIMAL(5, 2) NOT NULL,
  horizon VARCHAR(20) NOT NULL, -- 1D, 1W, 1M
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP
);

-- Market data cache for price history
CREATE TABLE IF NOT EXISTS market_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  symbol VARCHAR(10) NOT NULL,
  open_price DECIMAL(18, 8),
  high_price DECIMAL(18, 8),
  low_price DECIMAL(18, 8),
  close_price DECIMAL(18, 8),
  volume BIGINT,
  trade_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(symbol, trade_date)
);

-- Analytics events table for tracking user interactions
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(50) NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  event_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON admin_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_login_at ON admin_sessions(login_at);
CREATE INDEX IF NOT EXISTS idx_trading_signals_created_at ON trading_signals(created_at);
CREATE INDEX IF NOT EXISTS idx_market_data_symbol_date ON market_data(symbol, trade_date);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

-- Grant permissions (if using a specific user/role)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cheggie_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cheggie_user;
-- GRANT USAGE ON SCHEMA public TO cheggie_user;

COMMIT;
