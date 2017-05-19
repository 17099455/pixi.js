import determineCrossOrigin from '../../utils/determineCrossOrigin';
import TextureResource from './TextureResource';

export default class ImageResource extends TextureResource
{
    constructor(source)
    {
        super(source);

        this.load = new Promise((resolve, reject) => {

            const source = this.source;

            source.onload = () => {
                this.loaded = true;
                source.onload = null;
                source.onerror = null;
                this.width = source.width;
                this.height = source.height;

                if(window.createImageBitmap)
                {
                    createImageBitmap(source).then((imageBitmap)=>{

                        this.source = imageBitmap;

                        resolve(this);

                    })
                }
                else
                {
                    resolve(this);
                }



            }



            if(source.complete && source.src)
            {
                this.loaded = true;
                source.onload = null;
                source.onerror = null;
                this.width = source.width;
                this.height = source.height;

                if(window.createImageBitmap)
                {
                    createImageBitmap(source).then((imageBitmap)=>{

                        this.source = imageBitmap;

                        resolve(this);

                    })
                }
                else
                {
                    resolve(this);
                }
            }

        //    source.onerror = () => {
          //      reject('unable to load "' + source.src + '" resource cannot be found')
            //}
        })
    }

    destroy()
    {
        this.source.src = '';
    }

    static from(url, crossorigin)
    {
        var image = new Image();

        if (crossorigin === undefined && url.indexOf('data:') !== 0)
        {
            image.crossOrigin = determineCrossOrigin(url);
        }

        image.src = url;
        return new ImageResource(image);
    }


}