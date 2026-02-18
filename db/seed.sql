INSERT INTO campers (id, name, username, emoji) VALUES
  (1, 'Maya Johnson',  'VelociMaya',   '🦕'),
  (2, 'Liam Chen',     'TriceraLiam',  '🦖'),
  (3, 'Sofia Ramirez', 'StegoSofia',   '🦴'),
  (4, 'Noah Williams', 'RexNoah',      '🌋')
ON CONFLICT (id) DO NOTHING;
