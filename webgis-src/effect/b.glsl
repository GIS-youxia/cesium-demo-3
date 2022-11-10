
//blurSamples 32
#define SAMPLES 32
uniform sampler2D colorTexture;
uniform float direction;

uniform float delta;
uniform float sigma;
uniform float stepSize;

varying vec2 v_textureCoordinates;
void main()
{
vec2 st = v_textureCoordinates;
vec2 dir = vec2(1.0 - direction, direction);
vec2 step = vec2(stepSize * (czm_pixelRatio / czm_viewport.zw));

vec3 g;
g.x = 1.0 / (sqrt(czm_twoPi) * sigma);
g.y = exp((-0.5 * delta * delta) / (sigma * sigma));
g.z = g.y * g.y;
vec4 result = texture2D(colorTexture, st) * g.x;

for (int i = 1; i < SAMPLES; ++i)
{
  g.xy *= g.yz;
  vec2 offset = float(i) * dir * step;
  result += texture2D(colorTexture, st - offset) * g.x;
  result += texture2D(colorTexture, st + offset) * g.x;
}
gl_FragColor = result;
}
